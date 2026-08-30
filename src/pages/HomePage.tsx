import HeroSection from "@/components/features/HeroSection";
import ManifestoStrip from "@/components/features/ManifestoStrip";
import ChannelShowcase from "@/components/features/ChannelShowcase";
import SocialPlatformsGrid from "@/components/features/SocialPlatformsGrid";
import VisionSection from "@/components/features/VisionSection";
import StatsSection from "@/components/features/StatsSection";
import CallToAction from "@/components/features/CallToAction";
import NewsFeed from "@/components/features/NewsFeed";
import SubscribeBox from "@/components/features/SubscribeBox";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ManifestoStrip />
      <VisionSection />
      <ChannelShowcase />

      {/* News Feed Section */}
      <section className="py-4 border-t border-sky-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-2">
            <p className="text-amber-400 font-urdu text-xl mb-1">تازہ ترین خبریں</p>
          </div>
        </div>
        <NewsFeed limit={6} />
      </section>

      <SocialPlatformsGrid />

      {/* Subscribe Section */}
      <section className="py-16 max-w-xl mx-auto px-4">
        <SubscribeBox />
      </section>

      <CallToAction />
    </main>
  );
}
