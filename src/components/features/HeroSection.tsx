import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GlobeOrb from "@/components/features/GlobeOrb";
import heroBanner from "@/assets/hero-banner.jpg";

const TYPING_PHRASES = [
  "Both eyes on what's really going on",
  "Realities and Facts at your doorstep",
  "We bring what they hide...!",
  "Truth through the Lens",
  "A Global Family Platform",
];

export default function HeroSection() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIndex];
    const speed = deleting ? 40 : 70;

    const timer = setTimeout(() => {
      if (!deleting) {
        if (charIndex < phrase.length) {
          setDisplayText(phrase.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(phrase.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setDeleting(false);
          setPhraseIndex((p) => (p + 1) % TYPING_PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050A14]/95 via-[#050A14]/80 to-[#050A14]/60" />
      <div className="absolute inset-0 hero-bg" />

      {/* Particle dots */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-sky-400/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animation: `floatY ${3 + Math.random() * 4}s ease-in-out infinite`,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen lg:py-28">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="opacity-0-init animate-fade-left delay-100 inline-flex items-center gap-2 glass-card rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-400 text-xs font-heading font-bold tracking-widest uppercase">
                Global Family Platform
              </span>
            </div>

            {/* Main Title */}
            <div className="opacity-0-init animate-fade-left delay-200">
              <h1 className="font-heading font-black leading-none">
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-2">
                  SMART
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gradient-blue mb-2">
                  WORLD
                </span>
                <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gradient-gold">
                  ORDER
                </span>
              </h1>
            </div>

            {/* Typing Text */}
            <div className="opacity-0-init animate-fade-left delay-300 h-12 flex items-center">
              <p className="text-sky-400 font-heading font-semibold text-lg lg:text-xl glow-text-blue">
                👁️ {displayText}
                <span className="inline-block w-0.5 h-5 bg-sky-400 ml-1 animate-pulse" />
              </p>
            </div>

            {/* Description */}
            <div className="opacity-0-init animate-fade-left delay-400">
              <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-xl">
                Neither a Global Village nor a Global Community.{" "}
                <strong className="text-amber-400">
                  It's a Global Family Platform.
                </strong>
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Vision by{" "}
                <span className="text-sky-400 font-semibold">
                  Dr M Irfan Qadir Thaheem
                </span>
              </p>
            </div>

            {/* Values */}
            <div className="opacity-0-init animate-fade-left delay-500 flex flex-wrap gap-2">
              {["Unity", "Integrity", "Universality", "Truth", "Justice"].map(
                (val) => (
                  <span
                    key={val}
                    className="glass-card text-sky-300 text-xs font-heading font-semibold px-3 py-1.5 rounded-full tracking-wide"
                  >
                    {val}
                  </span>
                )
              )}
            </div>

            {/* CTA Buttons */}
            <div className="opacity-0-init animate-fade-left delay-600 flex flex-col sm:flex-row gap-4">
              <a
                href="https://youtube.com/@UniOrbi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white font-heading font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(239,68,68,0.5)] hover:-translate-y-1"
              >
                <span className="text-xl">▶</span>
                <div>
                  <div className="text-sm">Subscribe Now</div>
                  <div className="text-xs opacity-70">UniOrbi · YouTube</div>
                </div>
              </a>
              <Link
                to="/manifesto"
                className="flex items-center justify-center gap-3 glass-card hover:border-sky-500/50 text-sky-400 font-heading font-bold px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.2)] hover:-translate-y-1"
              >
                <span className="text-xl">📜</span>
                <div>
                  <div className="text-sm">Our Manifesto</div>
                  <div className="text-xs opacity-70">Vision & Mission</div>
                </div>
              </Link>
            </div>

            {/* Urdu tagline */}
            <div className="opacity-0-init animate-fade-left delay-700 glass-card-gold rounded-xl px-4 py-3 max-w-md">
              <p className="font-urdu text-amber-300 text-base leading-relaxed text-right">
                حقائق اور سچ آپ کی دہلیز تک
              </p>
              <p className="text-slate-500 text-xs mt-1">
                Realities and Facts at your doorstep
              </p>
            </div>
          </div>

          {/* Right — Globe */}
          <div className="opacity-0-init animate-fade-right delay-300 flex justify-center">
            <GlobeOrb />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-slate-500 text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-sky-500 to-transparent" />
      </div>
    </section>
  );
}
