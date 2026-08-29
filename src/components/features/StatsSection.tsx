import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATS = [
  { value: "5+", label: "Content Channels", icon: "📺", color: "text-sky-400" },
  { value: "8+", label: "Social Platforms", icon: "🌐", color: "text-amber-400" },
  { value: "∞", label: "Hidden Truths", icon: "🔍", color: "text-emerald-400" },
  { value: "1", label: "Global Family", icon: "🌍", color: "text-violet-400" },
];

export default function StatsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-12 border-y border-sky-500/10">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-amber-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div
                className={`font-heading font-black text-4xl lg:text-5xl ${stat.color} glow-text-blue`}
              >
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm mt-1 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
