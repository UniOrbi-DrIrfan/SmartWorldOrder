import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "dark" | "light" | "superbright" | "milkywhite" | "glassy";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute("data-theme", theme);
      },
    }),
    { name: "swo-theme" }
  )
);

export const THEME_CONFIG: Record<Theme, { label: string; icon: string; description: string }> = {
  dark: { label: "Dark", icon: "🌑", description: "Deep space dark" },
  light: { label: "Light", icon: "☀️", description: "Clean light mode" },
  superbright: { label: "Super Bright", icon: "💡", description: "Ultra bright mode" },
  milkywhite: { label: "Milky White", icon: "🥛", description: "Pure soft white" },
  glassy: { label: "Glassy", icon: "💎", description: "Glass gradients" },
};
