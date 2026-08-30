import { useState } from "react";
import { useThemeStore, THEME_CONFIG, Theme } from "@/stores/themeStore";

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 glass-card rounded-lg px-2.5 py-1.5 text-sm hover:border-sky-500/40 transition-all"
        title="Change Theme"
      >
        <span className="text-base leading-none">{THEME_CONFIG[theme].icon}</span>
        <span className="hidden sm:block text-slate-300 text-xs font-semibold">{THEME_CONFIG[theme].label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-sky-500/20 bg-[#080E1A] shadow-2xl overflow-hidden">
          {(Object.keys(THEME_CONFIG) as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTheme(t); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-sky-500/10 ${
                theme === t ? "bg-sky-500/10 text-sky-400" : "text-slate-300"
              }`}
            >
              <span className="text-lg">{THEME_CONFIG[t].icon}</span>
              <div className="text-left">
                <div className="font-semibold">{THEME_CONFIG[t].label}</div>
                <div className="text-xs text-slate-500">{THEME_CONFIG[t].description}</div>
              </div>
              {theme === t && <span className="ml-auto text-sky-400">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
