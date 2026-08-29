import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BRAND } from "@/constants/brand";
import bgTexture from "@/assets/background-texture.jpg";

export default function CallToAction() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-20 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bgTexture})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-sky-900/10 to-[#050A14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.12)_0%,transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="inline-flex items-center gap-2 glass-card-gold rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-heading font-bold tracking-widest">
              JOIN THE GLOBAL FAMILY
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Be Part of{" "}
            <span className="text-gradient-gold">
              Something
            </span>
            <br />
            <span className="text-gradient-blue">Bigger</span>
          </h2>

          <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
            Subscribe. Follow. Share. Every action brings us closer to a world
            of truth, justice, and unity.
          </p>

          <p className="text-sky-400 font-heading font-bold text-base mb-10">
            Vision by {BRAND.founder} · In-sha-Allah Azza-wa-Jall
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href="https://youtube.com/@UniOrbi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white font-heading font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_8px_40px_rgba(239,68,68,0.5)] hover:-translate-y-1"
            >
              ▶ Subscribe on YouTube
            </a>
            <a
              href="https://t.me/smartworldorder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 glass-card hover:border-sky-500/50 text-sky-400 font-heading font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)] hover:-translate-y-1"
            >
              ✈️ Join Telegram
            </a>
          </div>

          {/* Slogan */}
          <div className="glass-card rounded-2xl p-6 max-w-xl mx-auto">
            <p className="font-heading font-black text-lg text-white mb-2">
              UNITY · INTEGRITY · UNIVERSALITY
            </p>
            <p className="font-urdu text-amber-300 text-xl leading-relaxed">
              اتحاد · دیانتداری · آفاقیت
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
