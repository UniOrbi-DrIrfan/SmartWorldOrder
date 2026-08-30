import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, subscribers: 0, views: 0, analytics: 0 });
  const [loading, setLoading] = useState(true);
  const [recentPosts, setRecentPosts] = useState<{ id: string; title: string; category: string; views: number; created_at: string }[]>([]);

  useEffect(() => {
    async function load() {
      const [{ count: posts }, { count: subscribers }, { count: analytics }, { data: recent }] = await Promise.all([
        supabase.from("news_posts").select("*", { count: "exact", head: true }),
        supabase.from("subscribers").select("*", { count: "exact", head: true }),
        supabase.from("page_analytics").select("*", { count: "exact", head: true }),
        supabase.from("news_posts").select("id,title,category,views,created_at").order("created_at", { ascending: false }).limit(5),
      ]);
      const viewsRes = await supabase.from("news_posts").select("views");
      const totalViews = viewsRes.data?.reduce((s, r) => s + (r.views ?? 0), 0) ?? 0;
      setStats({ posts: posts ?? 0, subscribers: subscribers ?? 0, views: totalViews, analytics: analytics ?? 0 });
      setRecentPosts(recent ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const STAT_CARDS = [
    { label: "Total Posts", value: stats.posts, icon: "📝", color: "text-sky-400", link: "/admin/posts" },
    { label: "Subscribers", value: stats.subscribers, icon: "👥", color: "text-emerald-400", link: "/admin/subscribers" },
    { label: "Total Views", value: stats.views, icon: "👁", color: "text-amber-400", link: "/admin/analytics" },
    { label: "Page Visits", value: stats.analytics, icon: "📈", color: "text-violet-400", link: "/admin/analytics" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-white">Command Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">SMART WORLD ORDER — Admin Overview</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => <div key={i} className="glass-card rounded-2xl h-28 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((s) => (
            <Link key={s.label} to={s.link} className="glass-card rounded-2xl p-5 hover:border-sky-500/40 transition-all hover:-translate-y-0.5">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className={`font-heading font-black text-3xl ${s.color}`}>{s.value.toLocaleString()}</div>
              <div className="text-slate-400 text-xs mt-1 font-semibold">{s.label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { label: "New Post", icon: "✏️", link: "/admin/posts" },
          { label: "Subscribers", icon: "👥", link: "/admin/subscribers" },
          { label: "Analytics", icon: "📊", link: "/admin/analytics" },
          { label: "Integrations", icon: "🔌", link: "/admin/integrations" },
          { label: "My Accounts", icon: "👤", link: "/admin/personal" },
          { label: "View Site", icon: "🌐", link: "/" },
        ].map((a) => (
          <Link
            key={a.label}
            to={a.link}
            className="glass-card-gold rounded-xl p-4 text-center hover:-translate-y-0.5 transition-all hover:border-amber-500/40"
          >
            <div className="text-2xl mb-1">{a.icon}</div>
            <div className="text-amber-400 text-xs font-heading font-bold">{a.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-sky-500/10 flex items-center justify-between">
          <h3 className="font-heading font-bold text-white">Recent Posts</h3>
          <Link to="/admin/posts" className="text-sky-400 text-xs hover:underline">View All →</Link>
        </div>
        <div className="divide-y divide-sky-500/10">
          {recentPosts.map((p) => (
            <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-sky-500/5 transition-all">
              <span className="text-sm font-heading font-semibold text-white flex-1 line-clamp-1">{p.title}</span>
              <span className="text-xs bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded">{p.category}</span>
              <span className="text-slate-500 text-xs">👁 {p.views}</span>
              <span className="text-slate-500 text-xs hidden sm:block">{new Date(p.created_at).toLocaleDateString()}</span>
            </div>
          ))}
          {recentPosts.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm">No posts yet. Create your first post!</div>
          )}
        </div>
      </div>
    </div>
  );
}
