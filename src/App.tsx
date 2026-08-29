import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TickerBar from "@/components/layout/TickerBar";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ChannelsPage from "@/pages/ChannelsPage";
import PlatformsPage from "@/pages/PlatformsPage";
import ManifestoPage from "@/pages/ManifestoPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-[#050A14] text-white font-body overflow-x-hidden">
      <TickerBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/channels" element={<ChannelsPage />} />
        <Route path="/platforms" element={<PlatformsPage />} />
        <Route path="/manifesto" element={<ManifestoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}
