import ResultsHero from "@/components/ResultsHero";
import StatsBar from "@/components/StatsBar";
import TrackRecord from "@/components/TrackRecord";

export const metadata = {
  title: "Results | Core Consulting",
  description: "Track record, case studies, and impact metrics from Core Consulting's AI implementations across wealth management firms.",
};

export default function ResultsPage() {
  return (
    <>
      <div className="pt-20" />
      <ResultsHero />
      <StatsBar />
      <TrackRecord />
    </>
  );
}
