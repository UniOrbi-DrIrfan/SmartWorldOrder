import { useState } from "react";
import { useLanguageStore, LANGUAGES, LangCode } from "@/stores/languageStore";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguageStore();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES[lang];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 glass-card rounded-lg px-2.5 py-1.5 text-sm hover:border-sky-500/40 transition-all"
        title="Select Language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:block text-slate-300 text-xs font-semibold">{current.nativeLabel}</span>
        <span className="text-slate-500 text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-52 rounded-xl border border-sky-500/20 bg-[#080E1A] shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
          {(Object.entries(LANGUAGES) as [LangCode, typeof LANGUAGES[LangCode]][]).map(([code, meta]) => (
            <button
              key={code}
              onClick={() => { setLang(code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all hover:bg-sky-500/10 ${
                lang === code ? "bg-sky-500/10 text-sky-400" : "text-slate-300"
              }`}
            >
              <span className="text-lg">{meta.flag}</span>
              <div className="text-left flex-1">
                <span className="font-semibold">{meta.nativeLabel}</span>
                <span className="text-slate-500 text-xs ml-2">{meta.label}</span>
              </div>
              {meta.rtl && <span className="text-xs text-amber-500">RTL</span>}
              {lang === code && <span className="text-sky-400 text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
