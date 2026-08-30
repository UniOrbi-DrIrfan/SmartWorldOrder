import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LangCode =
  | "en" | "ur" | "ar" | "zh" | "hi" | "bn" | "ru" | "tr" | "ps" | "fa" | "sd" | "bal";

export interface LangMeta {
  label: string;
  nativeLabel: string;
  rtl: boolean;
  flag: string;
}

export const LANGUAGES: Record<LangCode, LangMeta> = {
  en:  { label: "English",   nativeLabel: "English",    rtl: false, flag: "🇬🇧" },
  ur:  { label: "Urdu",      nativeLabel: "اردو",        rtl: true,  flag: "🇵🇰" },
  ar:  { label: "Arabic",    nativeLabel: "العربية",     rtl: true,  flag: "🇸🇦" },
  zh:  { label: "Chinese",   nativeLabel: "中文",         rtl: false, flag: "🇨🇳" },
  hi:  { label: "Hindi",     nativeLabel: "हिन्दी",       rtl: false, flag: "🇮🇳" },
  bn:  { label: "Bengali",   nativeLabel: "বাংলা",        rtl: false, flag: "🇧🇩" },
  ru:  { label: "Russian",   nativeLabel: "Русский",     rtl: false, flag: "🇷🇺" },
  tr:  { label: "Turkish",   nativeLabel: "Türkçe",      rtl: false, flag: "🇹🇷" },
  ps:  { label: "Pashto",    nativeLabel: "پښتو",         rtl: true,  flag: "🇦🇫" },
  fa:  { label: "Persian",   nativeLabel: "فارسی",        rtl: true,  flag: "🇮🇷" },
  sd:  { label: "Sindhi",    nativeLabel: "سنڌي",         rtl: true,  flag: "🇵🇰" },
  bal: { label: "Balochi",   nativeLabel: "بلوچی",        rtl: true,  flag: "🇵🇰" },
};

// UI translations
export const UI_TRANSLATIONS: Partial<Record<LangCode, Record<string, string>>> = {
  en: {
    home: "Home", about: "About", channels: "Channels", platforms: "Platforms",
    manifesto: "Manifesto", news: "News", subscribe: "Subscribe",
    readMore: "Read More", share: "Share", latestNews: "Latest News",
    categories: "Categories", all: "All", search: "Search...",
    emailPlaceholder: "Enter your email", joinFamily: "Join the Global Family",
    subscribeCTA: "Subscribe for Truth & Updates",
    adminPanel: "Admin Panel",
  },
  ur: {
    home: "ہوم", about: "ہمارے بارے میں", channels: "چینلز", platforms: "پلیٹ فارمز",
    manifesto: "منشور", news: "خبریں", subscribe: "سبسکرائب",
    readMore: "مزید پڑھیں", share: "شیئر", latestNews: "تازہ ترین خبریں",
    categories: "زمرے", all: "سب", search: "تلاش...",
    emailPlaceholder: "ای میل درج کریں", joinFamily: "عالمی خاندان میں شامل ہوں",
    subscribeCTA: "سچ اور اپڈیٹس کے لیے سبسکرائب کریں",
    adminPanel: "ایڈمن پینل",
  },
  ar: {
    home: "الرئيسية", about: "من نحن", channels: "القنوات", platforms: "المنصات",
    manifesto: "البيان", news: "الأخبار", subscribe: "اشترك",
    readMore: "اقرأ المزيد", share: "مشاركة", latestNews: "آخر الأخبار",
    categories: "التصنيفات", all: "الكل", search: "بحث...",
    emailPlaceholder: "أدخل بريدك الإلكتروني", joinFamily: "انضم إلى العائلة العالمية",
    subscribeCTA: "اشترك للحصول على الحقيقة والتحديثات",
    adminPanel: "لوحة الإدارة",
  },
};

export function t(key: string, lang: LangCode): string {
  return UI_TRANSLATIONS[lang]?.[key] ?? UI_TRANSLATIONS["en"]?.[key] ?? key;
}

interface LanguageStore {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  isRTL: boolean;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: "en",
      isRTL: false,
      setLang: (lang) => {
        const isRTL = LANGUAGES[lang]?.rtl ?? false;
        set({ lang, isRTL });
        document.documentElement.dir = isRTL ? "rtl" : "ltr";
        document.documentElement.lang = lang;
        // Apply RTL font
        if (isRTL) {
          document.body.style.fontFamily = "'Noto Nastaliq Urdu', serif";
        } else if (lang === "zh") {
          document.body.style.fontFamily = "'Noto Sans SC', 'Open Sans', sans-serif";
        } else {
          document.body.style.fontFamily = "'Open Sans', sans-serif";
        }
      },
    }),
    { name: "swo-lang" }
  )
);
