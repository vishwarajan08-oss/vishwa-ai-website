"use client";

import dynamic from "next/dynamic";
import Vision from "@/components/Vision";

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
  loading: () => null,
});

export default function VisionPageClient() {
  return (
    <>
      <div className="pt-20" />
      <Vision />
      <Testimonials />
    </>
  );
}
