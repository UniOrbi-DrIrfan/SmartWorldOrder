import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = ["/", "/news", "/about", "/channels", "/platforms", "/manifesto"];
const STAR_SIZE = 40;

interface SidebarStarProps {
  side: "left" | "right";
}

function SidebarStar({ side }: SidebarStarProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const idx = NAV_LINKS.indexOf(location.pathname);

  const prevPath = idx > 0 ? NAV_LINKS[idx - 1] : null;
  const nextPath = idx < NAV_LINKS.length - 1 ? NAV_LINKS[idx + 1] : null;

  const ROUTE_LABELS: Record<string, string> = {
    "/": "Home", "/news": "News", "/about": "About",
    "/channels": "Channels", "/platforms": "Platforms", "/manifesto": "Manifesto",
  };

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <>
      {/* Star Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed top-20 z-50 w-10 h-10 flex items-center justify-center text-xl transition-all duration-300 ${
          side === "left" ? "left-1" : "right-1"
        } ${open ? "text-amber-400 scale-110" : "text-slate-600 hover:text-amber-400 hover:scale-110"}`}
        title={`${side === "left" ? "Left" : "Right"} sidebar`}
        style={{ width: STAR_SIZE, height: STAR_SIZE }}
      >
        ⭐
      </button>

      {/* Sidebar Panel */}
      {open && (
        <div
          ref={panelRef}
          className={`fixed top-16 z-50 w-48 glass-card border-sky-500/20 shadow-2xl rounded-2xl overflow-hidden transition-all ${
            side === "left" ? "left-2" : "right-2"
          }`}
        >
          <div className="p-3 border-b border-sky-500/10">
            <div className="text-xs font-heading font-bold text-amber-400">Quick Nav</div>
          </div>
          <div className="p-2">
            {NAV_LINKS.map((path) => (
              <Link key={path} to={path} onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  location.pathname === path
                    ? "text-sky-400 bg-sky-500/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}>
                {location.pathname === path && <span className="text-sky-400">▸</span>}
                {ROUTE_LABELS[path]}
              </Link>
            ))}
          </div>

          {/* Prev/Next */}
          <div className="p-2 border-t border-sky-500/10 flex justify-between">
            {prevPath ? (
              <Link to={prevPath} onClick={() => setOpen(false)} className="text-xs text-slate-400 hover:text-sky-400 px-2 py-1">
                ← {ROUTE_LABELS[prevPath]}
              </Link>
            ) : <span />}
            {nextPath ? (
              <Link to={nextPath} onClick={() => setOpen(false)} className="text-xs text-slate-400 hover:text-sky-400 px-2 py-1">
                {ROUTE_LABELS[nextPath]} →
              </Link>
            ) : <span />}
          </div>
        </div>
      )}
    </>
  );
}

export default function StarSidebars() {
  return (
    <>
      <SidebarStar side="left" />
      <SidebarStar side="right" />
    </>
  );
}
