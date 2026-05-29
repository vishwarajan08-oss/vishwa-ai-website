import { content } from "@/config/content";

export default function StatsBar() {
  const { stats } = content.trackRecord;

  return (
    <section className="border-y border-neutral-100 py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl md:text-4xl font-black text-[#0A1628] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-neutral-400 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
