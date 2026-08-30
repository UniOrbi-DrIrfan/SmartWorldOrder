import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useLanguageStore } from "@/stores/languageStore";

export default function AnalyticsTracker() {
  const location = useLocation();
  const { lang } = useLanguageStore();

  useEffect(() => {
    supabase.from("page_analytics").insert({
      page: location.pathname,
      lang,
      referrer: document.referrer || null,
    });
  }, [location.pathname]);

  return null;
}
