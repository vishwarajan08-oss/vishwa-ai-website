import Vision from "@/components/Vision";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "Vision | Core Consulting",
  description: "Where Core Consulting is headed — scaling AI infrastructure across advisory firms.",
};

export default function VisionPage() {
  return (
    <>
      <div className="pt-20" />
      <Vision />
      <Testimonials />
    </>
  );
}
