import { useState } from "react";
import { useNavMode } from "@/hooks/useNavMode";

export default function NavigationModeControl() {
  const [swipe, setSwipe] = useState(true);
  const [keyboard, setKeyboard] = useState(true);
  const [showPanel, setShowPanel] = useState(false);

  useNavMode({ swipe, keyboard });

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-amber-400 hover:border-amber-500/40 transition-all shadow-lg"
        title="Navigation Modes"
      >
        🎮
      </button>

      {showPanel && (
        <div className="absolute bottom-14 right-0 w-56 glass-card rounded-2xl p-4 shadow-2xl border-sky-500/20">
          <div className="text-xs font-heading font-bold text-amber-400 mb-3 tracking-wider">NAV MODES</div>
          <div className="space-y-2.5">
            {[
              { label: "Swipe Left/Right", icon: "👆", state: swipe, set: setSwipe },
              { label: "Arrow Keys", icon: "⌨", state: keyboard, set: setKeyboard },
            ].map((mode) => (
              <label key={mode.label} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <span>{mode.icon}</span>
                  <span className="text-slate-300 text-xs">{mode.label}</span>
                </div>
                <div
                  onClick={() => mode.set(!mode.state)}
                  className={`w-8 h-4 rounded-full transition-all relative ${mode.state ? "bg-sky-500" : "bg-slate-700"}`}
                >
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${mode.state ? "left-4" : "left-0.5"}`} />
                </div>
              </label>
            ))}

            <div className="border-t border-sky-500/10 pt-2">
              <p className="text-slate-500 text-[10px]">⭐ Star icons = sidebar nav</p>
              <p className="text-slate-500 text-[10px] mt-0.5">Scroll = up/down pages</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
