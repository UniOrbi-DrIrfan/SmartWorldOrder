import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TickerBar from "@/components/layout/TickerBar";
import ThemeApplier from "@/components/layout/ThemeApplier";
import AnalyticsTracker from "@/components/layout/AnalyticsTracker";
import StarSidebars from "@/components/features/StarSidebars";
import NavigationModeControl from "@/components/layout/NavigationModeControl";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ChannelsPage from "@/pages/ChannelsPage";
import PlatformsPage from "@/pages/PlatformsPage";
import ManifestoPage from "@/pages/ManifestoPage";
import NewsPage from "@/pages/NewsPage";
import NotFound from "@/pages/NotFound";

import { AdminLogin, AdminLayout } from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminPosts from "@/pages/admin/AdminPosts";
import AdminSubscribers from "@/pages/admin/AdminSubscribers";
import AdminAnalytics from "@/pages/admin/AdminAnalytics";
import AdminIntegrations from "@/pages/admin/AdminIntegrations";
import AdminPersonal from "@/pages/admin/AdminPersonal";

export default function App() {
  return (
    <>
      <ThemeApplier />
      <AnalyticsTracker />
      <StarSidebars />
      <NavigationModeControl />

      <Routes>
        {/* Admin routes — no Navbar/Footer */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard"    element={<AdminDashboard />} />
          <Route path="posts"        element={<AdminPosts />} />
          <Route path="subscribers"  element={<AdminSubscribers />} />
          <Route path="analytics"    element={<AdminAnalytics />} />
          <Route path="integrations" element={<AdminIntegrations />} />
          <Route path="personal"     element={<AdminPersonal />} />
        </Route>

        {/* Public routes */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen text-white font-body overflow-x-hidden theme-bg">
              <TickerBar />
              <Navbar />
              <Routes>
                <Route path="/"          element={<HomePage />} />
                <Route path="/news"      element={<NewsPage />} />
                <Route path="/about"     element={<AboutPage />} />
                <Route path="/channels"  element={<ChannelsPage />} />
                <Route path="/platforms" element={<PlatformsPage />} />
                <Route path="/manifesto" element={<ManifestoPage />} />
                <Route path="*"          element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}
