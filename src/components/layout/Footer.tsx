import { Link } from "react-router-dom";
import { BRAND, SOCIAL_PLATFORMS, CHANNELS } from "@/constants/brand";
import logoSrc from "@/assets/swo-logo.png";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-sky-500/20 bg-[#030712]">
      {/* Glow line */}
      <div className="divider-glow w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoSrc}
                alt="SWO"
                className="w-12 h-12 rounded-full glow-blue"
              />
              <div>
                <div className="font-heading font-black text-sm text-gradient-blue">
                  SMART WORLD ORDER
                </div>
                <div className="text-amber-400 text-xs font-semibold tracking-widest">
                  GLOBAL FAMILY PLATFORM
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              {BRAND.slogan}
            </p>
            <p className="text-sky-400 text-xs font-semibold">
              Vision by {BRAND.founder}
            </p>
            <div className="mt-4 glass-card rounded-lg px-4 py-3">
              <p className="text-amber-400 text-xs font-bold tracking-wider">
                In-sha-Allah Azza-wa-Jall
              </p>
            </div>
          </div>

          {/* Channels */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm tracking-wider mb-6 uppercase">
              Our Channels
            </h3>
            <ul className="space-y-2">
              {CHANNELS.map((ch) => (
                <li key={ch.id}>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm transition-colors group"
                  >
                    <span>{ch.icon}</span>
                    <span className="group-hover:underline">
                      {ch.name}
                    </span>
                    {ch.badge === "COMING SOON" && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                        SOON
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm tracking-wider mb-6 uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "About SWO", path: "/about" },
                { label: "Channels", path: "/channels" },
                { label: "Social Platforms", path: "/platforms" },
                { label: "Manifesto", path: "/manifesto" },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-slate-400 hover:text-sky-400 text-sm transition-colors hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="font-heading font-bold text-white text-sm tracking-wider mb-6 uppercase">
              Contact Us
            </h3>
            <div className="space-y-3 mb-6">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm transition-colors"
              >
                ✉️ {BRAND.email}
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-sky-400 text-sm transition-colors"
              >
                📱 WhatsApp: {BRAND.whatsapp}
              </a>
            </div>

            {/* Social Icons */}
            <div className="grid grid-cols-4 gap-2">
              {SOCIAL_PLATFORMS.slice(0, 8).map((sp) => (
                <a
                  key={sp.name}
                  href={sp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={sp.name}
                  className="w-10 h-10 glass-card rounded-lg flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition-all text-xs font-bold"
                >
                  {sp.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © 2025 SMART WORLD ORDER. Vision by Dr M Irfan Qadir Thaheem.
            All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 text-xs font-bold tracking-widest">
              UNITY · INTEGRITY · UNIVERSALITY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
