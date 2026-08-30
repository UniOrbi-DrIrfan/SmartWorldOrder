import { useEffect, useState } from "react";
import { supabase, NewsPost } from "@/lib/supabase";
import { useLanguageStore, t } from "@/stores/languageStore";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import NewsCard from "./NewsCard";
import SubscribeBox from "./SubscribeBox";

const CATEGORIES = ["All", "Global", "Political", "Social", "Media", "Technology", "Educational", "Motivational"];

export default function NewsFeed({ limit = 20 }: { limit?: number }) {
  const { lang } = useLanguageStore();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from("news_posts")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    setPosts(data ?? []);
    setLoading(false);
  }

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.title_ur ?? "").includes(search) ||
      (p.body ?? "").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div>
          <p className="text-sky-400 font-heading font-bold text-xs tracking-[0.3em] uppercase mb-1">
            Truth at Your Doorstep
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-white">
            {t("latestNews", lang)}
          </h2>
        </div>
        <input
          type="text"
          placeholder={t("search", lang)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 bg-white/5 border border-sky-500/20 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/60 transition-all"
        />
      </div>

      {/* Category Tabs */}
      <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100 ${visible ? "opacity-100" : "opacity-0"}`}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full font-heading font-semibold text-xs transition-all ${
              activeCategory === cat
                ? "bg-sky-500 text-white shadow-[0_4px_12px_rgba(14,165,233,0.4)]"
                : "glass-card text-slate-400 hover:text-sky-400 hover:border-sky-500/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl h-72 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-slate-400">No posts found in this category.</p>
        </div>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <div className="mb-8">
              <NewsCard post={featured} lang={lang} featured />
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {rest.map((post, i) => (
              <div
                key={post.id}
                className={`transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <NewsCard post={post} lang={lang} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Subscribe box */}
      <div className="max-w-xl mx-auto mt-8">
        <SubscribeBox />
      </div>
    </section>
  );
}
