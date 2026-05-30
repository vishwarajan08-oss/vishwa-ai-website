import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const rateLimitStore = new Map();

function cleanExpiredLimits(now) {
  if (rateLimitStore.size > 1000) {
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now - data.windowStart > 3600000) {
        rateLimitStore.delete(ip);
      }
    }
  }
}

export async function POST(request) {
  try {
    const now = Date.now();
    cleanExpiredLimits(now);

    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const oneHour = 3600000;

    let clientData = rateLimitStore.get(ip);
    if (!clientData) {
      clientData = { count: 0, windowStart: now };
      rateLimitStore.set(ip, clientData);
    }

    if (now - clientData.windowStart > oneHour) {
      clientData.count = 0;
      clientData.windowStart = now;
    }

    if (clientData.count >= 3) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in an hour." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, firm, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase
      .from("contact_submissions")
      .insert([{ name, firm: firm || "", email, message }]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save submission." },
        { status: 500 }
      );
    }

    clientData.count += 1;
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
