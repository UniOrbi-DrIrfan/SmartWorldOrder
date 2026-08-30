import NewsFeed from "@/components/features/NewsFeed";
import SubscribeBox from "@/components/features/SubscribeBox";

export default function NewsPage() {
  return (
    <main className="min-h-screen">
      <section className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1)_0%,transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <p className="text-sky-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-3">
            Truth at Your Doorstep
          </p>
          <h1 className="font-heading font-black text-5xl sm:text-6xl text-white mb-4">
            Live <span className="text-gradient-blue">News Feed</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-2">
            Dark Realities · Hidden Facts · Deeper Insights
          </p>
          <p className="text-amber-400 font-urdu text-xl">خبریں · حقائق · گہری بصیرت</p>
          <div className="divider-glow w-40 mx-auto mt-6" />
        </div>
      </section>

      <NewsFeed limit={50} />

      <section className="py-12 max-w-xl mx-auto px-4">
        <SubscribeBox />
      </section>
    </main>
  );
}
