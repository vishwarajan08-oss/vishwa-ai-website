import AboutPage from "@/components/AboutPage";
import HeroParallaxWrapper from "@/components/HeroParallaxWrapper";

export const metadata = {
  title: "About | Core Consulting",
  description: "Core Consulting was founded to help wealth management firms adopt AI in a way that feels practical, strategic, and relationship-focused.",
};

export default function About() {
  return (
    <HeroParallaxWrapper>
      <AboutPage />
    </HeroParallaxWrapper>
  );
}
