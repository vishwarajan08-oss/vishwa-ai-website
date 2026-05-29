import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import TrackRecord from "@/components/TrackRecord";
import Vision from "@/components/Vision";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatsBar />
        <Services />
        <TrackRecord />
        <Vision />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
