import Hero from "@/components/Hero";
import Services from "@/components/Services";
import StatsBar from "@/components/StatsBar";
import Testimonials from "@/components/Testimonials";
import HomeCTA from "@/components/HomeCTA";

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
