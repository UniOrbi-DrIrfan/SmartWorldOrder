import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/constants/brand";
import { useLanguageStore, t } from "@/stores/languageStore";
import { useThemeStore } from "@/stores/themeStore";
import ThemeToggle from "@/components/features/ThemeToggle";
import LanguageSelector from "@/components/features/LanguageSelector";
import logoSrc from "@/assets/swo-logo.png";

const NAV_LINKS = [
  { key: "home",      path: "/" },
  { key: "news",      path: "/news" },
  { key: "about",     path: "/about" },
  { key: "channels",  path: "/channels" },
  { key: "platforms", path: "/platforms" },
  { key: "manifesto", path: "/manifesto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { lang } = useLanguageStore();
  const { theme } = useThemeStore();

  const isDark = theme === "dark" || theme === "glassy";
  const navBg = isDark
    ? scrolled ? "bg-[#050A14]/95 backdrop-blur-md border-b border-sky-500/20 shadow-[0_4px_30px_rgba(14,165,233,0.08)]" : "bg-transparent"
    : scrolled ? "bg-white/95 backdrop-blur-md border-b border-sky-200 shadow-md" : "bg-transparent";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        // handled by individual components
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const textColor = isDark ? "text-slate-300 hover:text-sky-400" : "text-slate-700 hover:text-sky-600";
  const activeColor = isDark ? "text-sky-400 bg-sky-500/10 border border-sky-500/30" : "text-sky-600 bg-sky-50 border border-sky-200";

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-2">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={logoSrc}
              alt="SWO Logo"
              className="w-10 h-10 rounded-full object-cover glow-blue transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <div className="font-heading font-black text-sm text-gradient-blue leading-none tracking-wide">
                SMART WORLD ORDER
              </div>
              <div className="text-amber-400 text-[10px] font-semibold tracking-widest mt-0.5">
                {BRAND.vision.toUpperCase()}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg font-heading font-semibold text-xs transition-all duration-300 ${
                  location.pathname === link.path ? activeColor : textColor
                }`}
              >
                {t(link.key, lang)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div ref={dropdownRef} className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />

            {/* Admin */}
            <Link
              to="/admin"
              className="hidden sm:flex items-center gap-1.5 glass-card rounded-lg px-2.5 py-1.5 text-xs font-heading font-bold text-amber-400 hover:border-amber-500/40 transition-all"
            >
              🛡️ <span className="hidden md:block">Admin</span>
            </Link>

            {/* Subscribe CTA */}
            <a
              href="https://youtube.com/@UniOrbi"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-heading font-bold text-xs px-3 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)]"
            >
              ▶ <span>SUBSCRIBE</span>
            </a>

            {/* Mobile menu */}
            <button
              className="xl:hidden p-2 rounded-lg glass-card text-sky-400"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="xl:hidden py-4 border-t border-sky-500/20 animate-fade-down">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 font-heading font-semibold text-sm rounded-lg mb-1 transition-all ${
                  location.pathname === link.path ? activeColor : textColor
                }`}
              >
                {t(link.key, lang)}
              </Link>
            ))}
            <Link
              to="/admin"
              className="block px-4 py-3 font-heading font-semibold text-sm rounded-lg mb-1 text-amber-400 hover:bg-amber-500/5"
            >
              🛡️ {t("adminPanel", lang)}
            </Link>
            <a
              href="https://youtube.com/@UniOrbi"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 text-center bg-red-600 text-white font-bold text-sm py-3 rounded-lg"
            >
              ▶ SUBSCRIBE ON YOUTUBE
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
