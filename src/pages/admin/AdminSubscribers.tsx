import { useEffect, useState } from "react";
import { supabase, Subscriber } from "@/lib/supabase";
import { toast } from "sonner";

export default function AdminSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchSubs(); }, []);

  async function fetchSubs() {
    setLoading(true);
    const { data } = await supabase.from("subscribers").select("*").order("subscribed_at", { ascending: false });
    setSubscribers(data ?? []);
    setLoading(false);
  }

  async function toggleStatus(sub: Subscriber) {
    const newStatus = sub.status === "active" ? "unsubscribed" : "active";
    await supabase.from("subscribers").update({ status: newStatus }).eq("id", sub.id);
    fetchSubs();
    toast.success(`Subscriber ${newStatus}`);
  }

  function exportCSV() {
    const headers = ["email", "name", "lang", "status", "subscribed_at"];
    const rows = filtered.map((s) => [s.email, s.name ?? "", s.lang, s.status, s.subscribed_at]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "swo_subscribers.csv"; a.click();
  }

  const filtered = subscribers.filter(
    (s) => !search || s.email.toLowerCase().includes(search.toLowerCase()) || (s.name ?? "").toLowerCase().includes(search.toLowerCase())
  );
  const active = subscribers.filter((s) => s.status === "active").length;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">Subscribers</h1>
          <p className="text-slate-400 text-sm">{active} active · {subscribers.length} total</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search subscribers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-sky-500/20 rounded-xl px-4 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/50 w-56"
          />
          <button onClick={exportCSV} className="glass-card text-sky-400 hover:border-sky-500/50 px-4 py-2 rounded-xl text-sm font-semibold transition-all">
            ⬇ Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total", value: subscribers.length, color: "text-white" },
          { label: "Active", value: active, color: "text-emerald-400" },
          { label: "Unsubscribed", value: subscribers.length - active, color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4 text-center">
            <div className={`font-heading font-black text-2xl ${s.color}`}>{s.value}</div>
            <div className="text-slate-400 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(8)].map((_, i) => <div key={i} className="glass-card rounded-xl h-14 animate-pulse" />)}</div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="divide-y divide-sky-500/10">
            {filtered.length === 0 && (
              <div className="p-12 text-center text-slate-400">No subscribers yet.</div>
            )}
            {filtered.map((s) => (
              <div key={s.id} className="px-4 py-3 flex items-center gap-4 hover:bg-sky-500/5 transition-all">
                <div className="w-9 h-9 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-sm shrink-0">
                  {s.email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-semibold">{s.email}</div>
                  {s.name && <div className="text-slate-500 text-xs">{s.name}</div>}
                </div>
                <span className="text-xs bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded hidden sm:block">{s.lang.toUpperCase()}</span>
                <span className="text-slate-500 text-xs hidden md:block">{new Date(s.subscribed_at).toLocaleDateString()}</span>
                <button
                  onClick={() => toggleStatus(s)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    s.status === "active"
                      ? "bg-emerald-500/20 text-emerald-400 hover:bg-red-500/20 hover:text-red-400"
                      : "bg-red-500/10 text-red-400 hover:bg-emerald-500/20 hover:text-emerald-400"
                  }`}
                >
                  {s.status === "active" ? "✓ Active" : "Unsub"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
