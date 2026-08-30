import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";
import { useLanguageStore } from "@/stores/languageStore";

/**
 * Applies theme CSS variables and language direction on mount and state change.
 */
export default function ThemeApplier() {
  const { theme } = useThemeStore();
  const { lang, isRTL } = useLanguageStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [theme, lang, isRTL]);

  return null;
}
