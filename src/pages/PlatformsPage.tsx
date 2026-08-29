import SocialPlatformsGrid from "@/components/features/SocialPlatformsGrid";

export default function PlatformsPage() {
  return (
    <main className="min-h-screen pt-8">
      <section className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-amber-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-3">
            Everywhere You Are
          </p>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            Social <span className="text-gradient-gold">Platforms</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Follow SMART WORLD ORDER across every major platform and join 
            millions in the Global Family.
          </p>
          <div className="divider-glow w-32 mx-auto mt-6" />
        </div>
      </section>
      <SocialPlatformsGrid />
    </main>
  );
}
