import Hero from "@/components/Hero";
import HeroParallaxWrapper from "@/components/HeroParallaxWrapper";
import Services from "@/components/Services";
import StatsBar from "@/components/StatsBar";
import Testimonials from "@/components/Testimonials";
import HomeCTA from "@/components/HomeCTA";

export default function Home() {
  return (
    <>
      <HeroParallaxWrapper>
        <Hero />
      </HeroParallaxWrapper>
      <Services preview={true} />
      <StatsBar />
      <Testimonials />
      <HomeCTA />
    </>
  );
}
