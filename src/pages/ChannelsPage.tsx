import ChannelShowcase from "@/components/features/ChannelShowcase";

export default function ChannelsPage() {
  return (
    <main className="min-h-screen pt-8">
      <section className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-sky-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-3">
            The SWO Ecosystem
          </p>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-white mb-4">
            All <span className="text-gradient-blue">Channels</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Five specialized channels, one unified mission — truth, justice, and
            global family unity.
          </p>
          <div className="divider-glow w-32 mx-auto mt-6" />
        </div>
      </section>
      <ChannelShowcase />
    </main>
  );
}
