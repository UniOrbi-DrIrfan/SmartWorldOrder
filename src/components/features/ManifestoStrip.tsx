import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MANIFESTO_POINTS } from "@/constants/brand";

export default function ManifestoStrip() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 section-bg-alt overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-sky-500/30 via-sky-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sky-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-3">
            What We Stand For
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our{" "}
            <span className="text-gradient-gold">Manifesto</span>
          </h2>
          <div className="divider-glow w-32 mx-auto mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MANIFESTO_POINTS.map((point, i) => {
            const fromDirections = [
              "translate-x-[-80px]",
              "translate-y-[-60px]",
              "translate-x-[80px]",
              "translate-x-[-80px]",
              "translate-y-[60px]",
              "translate-x-[80px]",
            ];
            return (
              <div
                key={point.title}
                className={`glass-card rounded-2xl p-6 hover:border-sky-500/40 transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] ${
                  visible
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : `opacity-0 ${fromDirections[i]}`
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">
                  {point.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card-gold rounded-2xl max-w-3xl mx-auto p-8">
            <p className="font-heading font-black text-xl lg:text-2xl text-white leading-relaxed mb-4">
              No more Aggression, Oppression, Suppression &amp; Occupation.
              <br />
              <span className="text-amber-400">
                No more Cruelty, Inequality and Political Differentiations.
              </span>
            </p>
            <p className="text-sky-400 font-bold tracking-wider">
              In-sha-Allah Azza-wa-Jall
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
