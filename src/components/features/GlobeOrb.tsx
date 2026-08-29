export default function GlobeOrb() {
  return (
    <div className="relative w-80 h-80 lg:w-[480px] lg:h-[480px] mx-auto">
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full border-2 border-sky-500/20 animate-orbit" />
      <div
        className="absolute inset-4 rounded-full border border-amber-500/15 animate-orbit"
        style={{ animationDelay: "2s", animationDuration: "12s" }}
      />
      <div
        className="absolute inset-8 rounded-full border border-sky-400/10 animate-orbit"
        style={{ animationDelay: "4s", animationDuration: "16s" }}
      />

      {/* Globe circle */}
      <div
        className="absolute inset-12 lg:inset-16 rounded-full overflow-hidden animate-float"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #0EA5E9 0%, #0284C7 40%, #0A0F1E 100%)",
          boxShadow:
            "0 0 60px rgba(14,165,233,0.5), 0 0 120px rgba(14,165,233,0.2), inset 0 0 40px rgba(14,165,233,0.3)",
        }}
      >
        {/* Grid lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`h${i}`}
            className="absolute left-0 right-0 border-t border-sky-300/20"
            style={{ top: `${(i + 1) * 16.6}%` }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <div
            key={`v${i}`}
            className="absolute top-0 bottom-0 border-l border-sky-300/20"
            style={{ left: `${(i + 1) * 16.6}%` }}
          />
        ))}
        {/* Eye center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
            <div
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-4 border-amber-400 flex items-center justify-center"
              style={{ boxShadow: "0 0 30px rgba(245,158,11,0.7)" }}
            >
              <div
                className="w-5 h-5 lg:w-7 lg:h-7 rounded-full bg-amber-400"
                style={{ boxShadow: "0 0 15px rgba(245,158,11,0.9)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orbit dots */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <div
          key={deg}
          className="absolute w-2 h-2 rounded-full bg-sky-400"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${deg}deg) translateX(${
              typeof window !== "undefined" && window.innerWidth < 1024
                ? "135px"
                : "210px"
            }) translateY(-50%)`,
            boxShadow: "0 0 8px rgba(14,165,233,0.9)",
            opacity: 0.7,
          }}
        />
      ))}

      {/* Stats bubbles */}
      <div
        className="absolute top-4 left-0 glass-card rounded-xl px-3 py-2 text-center animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="text-sky-400 font-heading font-black text-lg">5+</div>
        <div className="text-slate-400 text-[10px]">Channels</div>
      </div>
      <div
        className="absolute bottom-8 right-0 glass-card rounded-xl px-3 py-2 text-center animate-float"
        style={{ animationDelay: "2.5s" }}
      >
        <div className="text-amber-400 font-heading font-black text-lg">8+</div>
        <div className="text-slate-400 text-[10px]">Platforms</div>
      </div>
      <div
        className="absolute top-1/2 -right-4 glass-card rounded-xl px-3 py-2 text-center animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="text-emerald-400 font-heading font-black text-lg">∞</div>
        <div className="text-slate-400 text-[10px]">Truth</div>
      </div>
    </div>
  );
}
