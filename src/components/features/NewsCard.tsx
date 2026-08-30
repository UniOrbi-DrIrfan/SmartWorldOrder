import { useState } from "react";
import { supabase, NewsPost } from "@/lib/supabase";
import { LangCode } from "@/stores/languageStore";
import { toast } from "sonner";

interface NewsCardProps {
  post: NewsPost;
  lang: LangCode;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  Global: "bg-sky-500/20 text-sky-300",
  Political: "bg-red-500/20 text-red-300",
  Social: "bg-emerald-500/20 text-emerald-300",
  Media: "bg-violet-500/20 text-violet-300",
  Technology: "bg-blue-500/20 text-blue-300",
  Educational: "bg-amber-500/20 text-amber-300",
  Motivational: "bg-orange-500/20 text-orange-300",
  General: "bg-slate-500/20 text-slate-300",
};

const SHARE_PLATFORMS = [
  { name: "WhatsApp", color: "hover:text-green-400", icon: "💬",  urlFn: (u: string, t: string) => `https://wa.me/?text=${encodeURIComponent(t + " " + u)}` },
  { name: "Twitter",  color: "hover:text-sky-400",   icon: "𝕏",   urlFn: (u: string, t: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}` },
  { name: "Facebook", color: "hover:text-blue-400",  icon: "f",   urlFn: (u: string) => `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}` },
  { name: "Telegram", color: "hover:text-cyan-400",  icon: "✈",   urlFn: (u: string, t: string) => `https://t.me/share/url?url=${encodeURIComponent(u)}&text=${encodeURIComponent(t)}` },
  { name: "Copy",     color: "hover:text-amber-400", icon: "📋",  urlFn: () => "" },
];

export default function NewsCard({ post, lang, featured = false }: NewsCardProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const title = lang === "ur" && post.title_ur ? post.title_ur
    : lang === "ar" && post.title_ar ? post.title_ar
    : post.title;

  const body = lang === "ur" && post.body_ur ? post.body_ur
    : lang === "ar" && post.body_ar ? post.body_ar
    : post.body;

  const isRTL = (lang === "ur" || lang === "ar");
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  function handleShare(platform: typeof SHARE_PLATFORMS[0]) {
    if (platform.name === "Copy") {
      navigator.clipboard.writeText(pageUrl);
      toast.success("Link copied!");
      return;
    }
    window.open(platform.urlFn(pageUrl, title), "_blank", "noopener");
  }

  async function incrementViews() {
    await supabase
      .from("news_posts")
      .update({ views: post.views + 1 })
      .eq("id", post.id);
  }

  const catColor = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.General;
  const dateStr = new Date(post.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });

  if (featured) {
    return (
      <article
        className="glass-card rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(14,165,233,0.2)] cursor-pointer border-sky-500/30"
        onClick={incrementViews}
        dir={isRTL ? "rtl" : "ltr"}
      >
        {post.image_url ? (
          <img src={post.image_url} alt={title} className="w-full h-56 object-cover" />
        ) : (
          <div className="w-full h-40 bg-gradient-to-br from-sky-900/40 to-blue-900/40 flex items-center justify-center text-6xl">
            📰
          </div>
        )}
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs font-heading font-bold px-3 py-1 rounded-full ${catColor}`}>
              {post.category}
            </span>
            <span className="text-slate-500 text-xs">{dateStr}</span>
            <span className="text-slate-500 text-xs ml-auto">👁 {post.views}</span>
          </div>
          <h3 className={`font-heading font-black text-xl lg:text-2xl text-white leading-tight mb-3 ${isRTL ? "font-urdu" : ""}`}>
            {title}
          </h3>
          <p className={`text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4 ${isRTL ? "font-urdu" : ""}`}>
            {body}
          </p>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded">#{tag}</span>
              ))}
            </div>
          )}

          <ShareBar post={post} title={title} open={shareOpen} setOpen={setShareOpen} onShare={handleShare} />
        </div>
      </article>
    );
  }

  return (
    <article
      className="glass-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] flex flex-col h-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-heading font-bold px-2.5 py-0.5 rounded-full ${catColor}`}>
          {post.category}
        </span>
        <span className="text-slate-500 text-xs ml-auto">{dateStr}</span>
      </div>

      <h3 className={`font-heading font-bold text-base text-white leading-snug mb-2 line-clamp-2 ${isRTL ? "font-urdu" : ""}`}>
        {title}
      </h3>

      <p className={`text-slate-400 text-xs leading-relaxed flex-1 mb-3 ${expanded ? "" : "line-clamp-3"} ${isRTL ? "font-urdu" : ""}`}>
        {body}
      </p>

      <div className="flex items-center gap-2 mt-auto">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sky-400 text-xs font-semibold hover:underline"
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
        <span className="text-slate-600 text-xs ml-auto">👁 {post.views}</span>
        <button
          onClick={() => setShareOpen(!shareOpen)}
          className="text-slate-400 hover:text-sky-400 text-xs font-semibold transition-colors"
        >
          ↗ Share
        </button>
      </div>

      {shareOpen && (
        <div className="mt-3 pt-3 border-t border-sky-500/10 flex items-center gap-3">
          {SHARE_PLATFORMS.map((p) => (
            <button
              key={p.name}
              onClick={() => handleShare(p)}
              title={p.name}
              className={`text-slate-400 text-base transition-colors ${p.color}`}
            >
              {p.icon}
            </button>
          ))}
        </div>
      )}

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded">#{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
}

function ShareBar({ open, setOpen, onShare }: {
  post: NewsPost; title: string;
  open: boolean; setOpen: (v: boolean) => void;
  onShare: (p: typeof SHARE_PLATFORMS[0]) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 font-semibold transition-colors"
      >
        ↗ Share
      </button>
      {open && SHARE_PLATFORMS.map((p) => (
        <button
          key={p.name}
          onClick={() => onShare(p)}
          title={p.name}
          className={`text-slate-400 text-lg transition-colors ${p.color}`}
        >
          {p.icon}
        </button>
      ))}
    </div>
  );
}
