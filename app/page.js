import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import StatsBar from "@/components/StatsBar";
import HomeCTA from "@/components/HomeCTA";

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Services preview={true} />
      <StatsBar />
      <Testimonials />
      <HomeCTA />
    </>
  );
}
