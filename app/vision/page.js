import Vision from "@/components/Vision";
import Testimonials from "@/components/Testimonials";

export const metadata = {
  title: "Vision | Core Consulting",
  description: "Where Core Consulting is headed: scaling AI infrastructure across advisory firms and building the operational backbone of next-generation wealth management.",
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
