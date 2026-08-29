import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BRAND } from "@/constants/brand";
import logoSrc from "@/assets/swo-logo.png";

export default function AboutPage() {
  const { ref: r1, visible: v1 } = useScrollReveal();
  const { ref: r2, visible: v2 } = useScrollReveal();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1)_0%,transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src={logoSrc}
            alt="SWO Logo"
            className="w-24 h-24 rounded-full glow-blue mx-auto mb-6 animate-float"
          />
          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-4">
            About <span className="text-gradient-blue">SMART WORLD ORDER</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {BRAND.slogan}
          </p>
        </div>
      </section>

      <div className="divider-glow w-full" />

      {/* About content */}
      <section ref={r1} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${
              v1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <h2 className="font-heading font-black text-3xl text-white mb-6">
              Who We Are
            </h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                <strong className="text-sky-400">SMART WORLD ORDER</strong> is
                a global media and content platform founded on the vision of{" "}
                <strong className="text-amber-400">
                  Dr M Irfan Qadir Thaheem
                </strong>
                .
              </p>
              <p>
                We are not just a media outlet — we are a movement. A movement
                for truth, justice, and the unity of the global human family.
              </p>
              <p>
                Through multiple channels including{" "}
                <strong className="text-sky-300">UniOrbi</strong>,{" "}
                <strong className="text-sky-300">UniEdge</strong>,{" "}
                <strong className="text-sky-300">UniNews</strong>,{" "}
                <strong className="text-sky-300">UniFeel</strong>, and{" "}
                <strong className="text-sky-300">UniSpark</strong>, we cover
                every dimension of human experience — political, social,
                educational, motivational, and cultural.
              </p>
              <p>
                Our commitment is unwavering: to bring what they hide, to
                expose double standards, and to ensure that every voice in the
                Global Family is heard.
              </p>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              v1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="space-y-4">
              {[
                { label: "Founded", value: "2025", icon: "📅" },
                { label: "Founder", value: BRAND.founder, icon: "👨‍💼" },
                { label: "Platform Type", value: "Global Family Media", icon: "🌍" },
                { label: "Channels", value: "UniOrbi, UniEdge, UniNews, UniFeel, UniSpark", icon: "📺" },
                { label: "Mission", value: BRAND.mission, icon: "🎯" },
                { label: "Values", value: BRAND.values.join(" · "), icon: "💎" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4 flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-slate-500 text-xs font-heading font-bold uppercase tracking-wider">{item.label}</div>
                    <div className="text-white font-semibold text-sm mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Channel Description */}
      <section ref={r2} className="py-20 section-bg-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`glass-card rounded-3xl p-8 lg:p-12 text-center transition-all duration-700 ${
              v2 ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h3 className="font-heading font-black text-2xl lg:text-3xl text-white mb-6">
              Channel Description
            </h3>
            <div className="text-slate-300 leading-relaxed space-y-4 text-left max-w-2xl mx-auto">
              <p className="font-heading font-bold text-sky-400 text-center text-lg">
                "SMART WORLD ORDER"
              </p>
              <p>
                Neither a Global Village nor a Global Community, It's a{" "}
                <strong className="text-amber-400">Global Family Platform</strong>.
              </p>
              <p>
                We're committed to Enhance the whole world in every field of
                life within <strong className="text-sky-400">Unity, Integrity and Universality</strong>{" "}
                In-sha-Allah Azza-wa-Jall.
              </p>
              <ul className="space-y-2">
                <li>👁️ Both eyes on what's really going on</li>
                <li>📰 Realities and Facts at your doorstep</li>
                <li>⚔️ A Fight against Injustice and Double Standards</li>
                <li>🔍 We bring what they hide...!</li>
              </ul>
              <div className="border-t border-sky-500/20 pt-4">
                <p className="font-heading font-bold text-amber-400 text-center">
                  In-sha-Allah Azza-wa-Jall
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
