import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BRAND } from "@/constants/brand";
import bgTexture from "@/assets/background-texture.jpg";

export default function VisionSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${bgTexture})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-transparent to-[#050A14]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Vision card */}
          <div
            className={`transition-all duration-800 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <div className="glass-card rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-tr-full" />

              <span className="inline-block bg-sky-500/10 text-sky-400 text-xs font-heading font-bold px-3 py-1 rounded-full tracking-widest uppercase mb-6">
                Our Vision
              </span>

              <h2 className="font-heading font-black text-2xl lg:text-3xl xl:text-4xl text-white leading-tight mb-6">
                Neither a Global Village
                <br />
                nor a Global Community.
                <br />
                <span className="text-gradient-gold">
                  It's a Global Family.
                </span>
              </h2>

              <p className="text-slate-300 leading-relaxed mb-6">
                We envision a world where every human being, regardless of
                nationality, religion, or creed, stands together as a family —
                united in truth, dignity, and justice.
              </p>

              <div className="border-t border-sky-500/20 pt-6">
                <p className="text-slate-400 text-sm mb-1">Vision by</p>
                <p className="font-heading font-bold text-sky-400 text-lg">
                  {BRAND.founder}
                </p>
                <p className="text-amber-400 text-sm font-urdu mt-2">
                  ڈاکٹر محمد عرفان قادر تھاہیم
                </p>
              </div>
            </div>
          </div>

          {/* Right: Mission details */}
          <div
            className={`space-y-6 transition-all duration-800 delay-200 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16"
            }`}
          >
            <div>
              <p className="text-sky-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-3">
                What Drives Us
              </p>
              <h3 className="font-heading font-black text-2xl lg:text-3xl text-white">
                Mission &amp; Values
              </h3>
            </div>

            {[
              {
                icon: "🎯",
                title: "Mission",
                text: "Realities and Facts at your doorstep — exposing hidden truths with integrity and depth.",
                color: "border-sky-500/30",
              },
              {
                icon: "🌍",
                title: "Vision",
                text: "A Global Family Platform — connecting 8 billion humans under one roof of unity and love.",
                color: "border-amber-500/30",
              },
              {
                icon: "⚔️",
                title: "Fight",
                text: "Against injustice, double standards, aggression, and the suppression of the truth globally.",
                color: "border-red-500/30",
              },
              {
                icon: "🔑",
                title: "Values",
                text: "Unity · Integrity · Universality — the three pillars that guide every decision we make.",
                color: "border-emerald-500/30",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`glass-card border-l-4 ${item.color} rounded-r-xl p-5 transition-all duration-500 hover:-translate-y-0.5`}
                style={{ transitionDelay: `${i * 100 + 300}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-heading font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
