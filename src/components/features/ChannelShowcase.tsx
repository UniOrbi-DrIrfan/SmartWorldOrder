import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CHANNELS } from "@/constants/brand";

export default function ChannelShowcase() {
  const { ref, visible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="text-sky-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-3">
            SWO Ecosystem
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our <span className="text-gradient-blue">Channels</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A complete media ecosystem covering every aspect of truth, justice,
            and global family unity.
          </p>
          <div className="divider-glow w-32 mx-auto mt-4" />
        </div>

        {/* Featured + smaller grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured card — UniOrbi */}
          <div
            className={`lg:col-span-1 lg:row-span-2 transition-all duration-700 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-16"
            }`}
          >
            <div
              className={`h-full glass-card rounded-3xl overflow-hidden hover:shadow-[0_12px_50px_rgba(239,68,68,0.25)] transition-all duration-500 hover:-translate-y-2 border border-red-500/20`}
            >
              <div className="h-3 bg-gradient-to-r from-red-600 to-red-900" />
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{CHANNELS[0].icon}</span>
                  <div>
                    <span className="bg-red-500 text-white text-[10px] font-heading font-bold px-2 py-0.5 rounded">
                      {CHANNELS[0].badge}
                    </span>
                    <h3 className="font-heading font-black text-2xl text-white mt-1">
                      {CHANNELS[0].name}
                    </h3>
                    <p className="text-red-400 text-xs font-semibold">
                      {CHANNELS[0].handle} · {CHANNELS[0].platform}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-6">
                  {CHANNELS[0].description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {CHANNELS[0].categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-xs bg-red-500/10 border border-red-500/20 text-red-300 px-2 py-1 rounded-lg font-semibold"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                    href={CHANNELS[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-red-600 hover:bg-red-500 text-white font-heading font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-[0_6px_25px_rgba(239,68,68,0.5)]"
                  >
                    <span>▶</span> Subscribe on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Other channels */}
          {CHANNELS.slice(1).map((channel, i) => {
            const animationClass =
              i % 2 === 0
                ? visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
                : visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12";

            return (
              <div
                key={channel.id}
                className={`transition-all duration-700 ${animationClass}`}
                style={{ transitionDelay: `${(i + 1) * 120}ms` }}
              >
                <div
                  className={`glass-card rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] transition-all duration-500 hover:-translate-y-1`}
                  style={{ borderColor: `${channel.color}30` }}
                >
                  <div
                    className="h-1.5 w-full"
                    style={{
                      background: `linear-gradient(to right, ${channel.color}, transparent)`,
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{channel.icon}</span>
                        <div>
                          <h3 className="font-heading font-bold text-white text-base">
                            {channel.name}
                          </h3>
                          <p className="text-slate-500 text-xs">
                            {channel.handle}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-[10px] font-heading font-bold px-2 py-1 rounded"
                        style={{
                          background: `${channel.color}20`,
                          color: channel.color,
                          border: `1px solid ${channel.color}40`,
                        }}
                      >
                        {channel.badge}
                      </span>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {channel.description}
                    </p>

                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full text-sm font-heading font-semibold transition-all duration-300 group"
                      style={{ color: channel.color }}
                    >
                      <span>
                        {channel.badge === "COMING SOON"
                          ? "Notify Me"
                          : "Visit Channel"}
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
