import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useLanguageStore, t } from "@/stores/languageStore";
import { toast } from "sonner";

export default function SubscribeBox({ compact = false }: { compact?: boolean }) {
  const { lang } = useLanguageStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const { error } = await supabase.from("subscribers").upsert(
      { email: email.trim().toLowerCase(), name: name.trim() || null, lang },
      { onConflict: "email" }
    );
    setLoading(false);
    if (error) {
      toast.error("Already subscribed or invalid email.");
      return;
    }
    setDone(true);
    toast.success("🌍 Welcome to the Global Family!");
  };

  if (done) {
    return (
      <div className={`glass-card-gold rounded-2xl p-6 text-center ${compact ? "p-4" : "p-8"}`}>
        <div className="text-4xl mb-2">🎉</div>
        <p className="font-heading font-bold text-amber-400 text-lg">You're in the Global Family!</p>
        <p className="text-slate-400 text-sm mt-1">In-sha-Allah Azza-wa-Jall</p>
      </div>
    );
  }

  return (
    <div className={`glass-card rounded-2xl ${compact ? "p-5" : "p-8 lg:p-10"}`}>
      {!compact && (
        <div className="mb-6 text-center">
          <h3 className="font-heading font-black text-2xl text-white mb-2">
            {t("joinFamily", lang)}
          </h3>
          <p className="text-slate-400 text-sm">{t("subscribeCTA", lang)}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        {!compact && (
          <input
            type="text"
            placeholder="Your Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-sky-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/60 transition-all"
          />
        )}
        <div className="flex gap-2">
          <input
            type="email"
            placeholder={t("emailPlaceholder", lang)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/5 border border-sky-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500/60 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500 hover:bg-sky-400 text-white font-heading font-bold px-5 py-3 rounded-xl transition-all disabled:opacity-50 text-sm whitespace-nowrap"
          >
            {loading ? "..." : t("subscribe", lang)}
          </button>
        </div>
      </form>
    </div>
  );
}
