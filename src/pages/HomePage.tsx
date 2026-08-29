import HeroSection from "@/components/features/HeroSection";
import ManifestoStrip from "@/components/features/ManifestoStrip";
import ChannelShowcase from "@/components/features/ChannelShowcase";
import SocialPlatformsGrid from "@/components/features/SocialPlatformsGrid";
import VisionSection from "@/components/features/VisionSection";
import StatsSection from "@/components/features/StatsSection";
import CallToAction from "@/components/features/CallToAction";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ManifestoStrip />
      <VisionSection />
      <ChannelShowcase />
      <SocialPlatformsGrid />
      <CallToAction />
    </main>
  );
}
