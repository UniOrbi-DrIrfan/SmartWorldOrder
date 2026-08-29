import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SOCIAL_PLATFORMS } from "@/constants/brand";

export default function SocialPlatformsGrid() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref}
      className="relative py-20 lg:py-28 section-bg-alt"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="text-amber-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-3">
            Find Us Everywhere
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Social <span className="text-gradient-gold">Platforms</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Follow us across all major platforms and join the Global Family
            revolution.
          </p>
          <div className="divider-glow w-32 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SOCIAL_PLATFORMS.map((platform, i) => {
            const dirs = [
              "-translate-x-8 -translate-y-8",
              "translate-y-8",
              "translate-x-8 -translate-y-8",
              "translate-x-8",
              "-translate-x-8",
              "translate-x-8 translate-y-8",
              "translate-y-8",
              "-translate-x-8 translate-y-8",
            ];

            return (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card rounded-2xl p-6 hover:border-sky-500/30 hover:-translate-y-2 transition-all duration-500 group hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] ${
                  visible
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : `opacity-0 ${dirs[i % dirs.length]}`
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-heading font-black text-sm text-white ${platform.bgClass} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-sm">
                      {platform.name}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {platform.handle}
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-xs">{platform.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sky-400 text-xs font-heading font-semibold group-hover:underline">
                    Follow →
                  </span>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: platform.color }}
                  />
                </div>
              </a>
            );
          })}
        </div>

        {/* WhatsApp CTA */}
        <div
          className={`mt-12 transition-all duration-700 delay-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://wa.me/923004737757"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 glass-card-gold max-w-2xl mx-auto rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.2)]"
          >
            <span className="text-4xl">💬</span>
            <div className="text-center sm:text-left">
              <div className="font-heading font-bold text-amber-400 text-lg">
                Connect on WhatsApp
              </div>
              <div className="text-slate-400 text-sm">
                Direct line to the SWO team · 0300-4737757
              </div>
            </div>
            <span className="sm:ml-auto text-amber-400 font-heading font-bold">
              Chat Now →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
