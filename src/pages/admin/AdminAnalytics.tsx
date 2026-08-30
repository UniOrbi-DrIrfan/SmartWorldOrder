import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function AdminAnalytics() {
  const [pageStats, setPageStats] = useState<{ page: string; count: number }[]>([]);
  const [langStats, setLangStats] = useState<{ lang: string; count: number }[]>([]);
  const [dailyStats, setDailyStats] = useState<{ day: string; visits: number }[]>([]);
  const [postStats, setPostStats] = useState<{ title: string; views: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: analytics }, { data: posts }] = await Promise.all([
        supabase.from("page_analytics").select("page,lang,visited_at").order("visited_at", { ascending: false }).limit(500),
        supabase.from("news_posts").select("title,views").order("views", { ascending: false }).limit(10),
      ]);

      if (analytics) {
        // Page stats
        const pageMap: Record<string, number> = {};
        analytics.forEach((r) => { pageMap[r.page] = (pageMap[r.page] ?? 0) + 1; });
        setPageStats(Object.entries(pageMap).map(([page, count]) => ({ page, count })).sort((a, b) => b.count - a.count));

        // Lang stats
        const langMap: Record<string, number> = {};
        analytics.forEach((r) => { langMap[r.lang] = (langMap[r.lang] ?? 0) + 1; });
        setLangStats(Object.entries(langMap).map(([lang, count]) => ({ lang, count })));

        // Daily stats (last 7 days)
        const today = new Date();
        const days: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today); d.setDate(d.getDate() - i);
          days[d.toLocaleDateString("en-GB", { month: "short", day: "numeric" })] = 0;
        }
        analytics.forEach((r) => {
          const d = new Date(r.visited_at);
          const key = d.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
          if (key in days) days[key]++;
        });
        setDailyStats(Object.entries(days).map(([day, visits]) => ({ day, visits })));
      }

      setPostStats(posts?.map((p) => ({ title: p.title.substring(0, 25) + "...", views: p.views })) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const COLORS = ["#0EA5E9", "#F59E0B", "#10B981", "#8B5CF6", "#EF4444", "#06B6D4"];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-heading font-black text-2xl text-white">Analytics</h1>
        <p className="text-slate-400 text-sm">Traffic insights & content performance</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => <div key={i} className="glass-card rounded-2xl h-64 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Visits */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-heading font-bold text-white mb-4">Daily Visits (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyStats}>
                <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "#060D1A", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="visits" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Page Views */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-heading font-bold text-white mb-4">Top Pages</h3>
            <div className="space-y-2">
              {pageStats.slice(0, 6).map((p, i) => (
                <div key={p.page} className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs w-5">{i + 1}.</span>
                  <span className="text-slate-300 text-sm flex-1">{p.page || "/"}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 rounded-full bg-sky-500/20 w-24">
                      <div className="h-full rounded-full bg-sky-500" style={{ width: `${Math.min(100, (p.count / (pageStats[0]?.count || 1)) * 100)}%` }} />
                    </div>
                    <span className="text-sky-400 text-xs font-bold w-8 text-right">{p.count}</span>
                  </div>
                </div>
              ))}
              {pageStats.length === 0 && <p className="text-slate-500 text-sm text-center py-8">No analytics data yet.</p>}
            </div>
          </div>

          {/* Language Distribution */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-heading font-bold text-white mb-4">Language Distribution</h3>
            {langStats.length > 0 ? (
              <div className="flex items-center gap-6">
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie data={langStats} cx={65} cy={65} outerRadius={60} dataKey="count">
                      {langStats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#060D1A", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 8, color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {langStats.map((l, i) => (
                    <div key={l.lang} className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ background: COLORS[i % COLORS.length] }} />
                      <span className="text-slate-300">{l.lang.toUpperCase()}</span>
                      <span className="text-slate-500 ml-1">{l.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-500 text-sm text-center py-8">No language data yet.</p>
            )}
          </div>

          {/* Top Posts */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-heading font-bold text-white mb-4">Top Posts by Views</h3>
            {postStats.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={postStats} layout="vertical">
                  <XAxis type="number" tick={{ fill: "#64748b", fontSize: 10 }} />
                  <YAxis type="category" dataKey="title" tick={{ fill: "#94a3b8", fontSize: 10 }} width={120} />
                  <Tooltip contentStyle={{ background: "#060D1A", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 8, color: "#fff" }} />
                  <Bar dataKey="views" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-500 text-sm text-center py-8">No post view data yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
