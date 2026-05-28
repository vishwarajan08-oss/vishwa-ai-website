import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// In-memory rate limiting store
const rateLimitStore = new Map();

// Lazy cleanup helper to prevent memory leaks in long-running instances
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

    // Get client IP address
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const oneHour = 3600000;

    let clientData = rateLimitStore.get(ip);
    if (!clientData) {
      clientData = { count: 0, windowStart: now };
      rateLimitStore.set(ip, clientData);
    }

    // Reset window if more than 1 hour has passed
    if (now - clientData.windowStart > oneHour) {
      clientData.count = 0;
      clientData.windowStart = now;
    }

    // Enforce rate limit (max 3 submissions per hour)
    if (clientData.count >= 3) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again in an hour." },
        { status: 429 }
      );
    }

    // Parse payload
    const body = await request.json();
    const { name, firm, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    // Insert into contact_submissions
    const { error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name,
          firm: firm || "",
          email,
          message,
        }
      ]);

    if (error) {
      console.error("Supabase Database error:", error);
      return NextResponse.json(
        { error: "Failed to save submission." },
        { status: 500 }
      );
    }

    // Increment rate limit count on success
    clientData.count += 1;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API Server Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
