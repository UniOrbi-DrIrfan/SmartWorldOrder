import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { BRAND } from "@/constants/brand";
import logoSrc from "@/assets/swo-logo.png";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Channels", path: "/channels" },
  { label: "Platforms", path: "/platforms" },
  { label: "Manifesto", path: "/manifesto" },
];

type Lang = "en" | "ur" | "ar";

const LANG_LABELS: Record<Lang, string> = {
  en: "EN",
  ur: "اردو",
  ar: "عربي",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#050A14]/95 backdrop-blur-md border-b border-sky-500/20 shadow-[0_4px_30px_rgba(14,165,233,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoSrc}
              alt="SWO Logo"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover glow-blue transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <div className="font-heading font-black text-sm lg:text-base text-gradient-blue leading-none tracking-wide">
                SMART WORLD ORDER
              </div>
              <div className="text-amber-400 text-xs font-semibold tracking-widest mt-0.5">
                {BRAND.vision.toUpperCase()}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-heading font-semibold text-sm transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-sky-400 bg-sky-500/10 border border-sky-500/30"
                    : "text-slate-300 hover:text-sky-400 hover:bg-sky-500/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-1 glass-card rounded-lg px-2 py-1">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              {(["en", "ur", "ar"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`text-xs px-1.5 py-0.5 rounded font-semibold transition-all ${
                    lang === l
                      ? "bg-sky-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {LANG_LABELS[l]}
                </button>
              ))}
            </div>

            {/* Subscribe CTA */}
            <a
              href="https://youtube.com/@UniOrbi"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-heading font-bold text-xs px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)]"
            >
              ▶ SUBSCRIBE
            </a>

            {/* Mobile menu */}
            <button
              className="lg:hidden p-2 rounded-lg glass-card text-sky-400"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden py-4 border-t border-sky-500/20 animate-fade-down">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 font-heading font-semibold text-sm rounded-lg mb-1 transition-all ${
                  location.pathname === link.path
                    ? "text-sky-400 bg-sky-500/10"
                    : "text-slate-300 hover:text-sky-400 hover:bg-sky-500/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
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
