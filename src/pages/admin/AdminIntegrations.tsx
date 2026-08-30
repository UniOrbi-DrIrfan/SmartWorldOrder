import { useState } from "react";
import { toast } from "sonner";

interface Integration {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  connected: boolean;
  color: string;
  fields: { label: string; key: string; type: string; placeholder: string }[];
}

const INTEGRATIONS: Integration[] = [
  { id: "supabase",   name: "Supabase",    category: "Backend",       icon: "⚡", color: "emerald", connected: true,  description: "Database, Auth & Storage — Already Connected", fields: [{ label: "Project URL", key: "url", type: "text", placeholder: "https://xxx.supabase.co" }] },
  { id: "github",     name: "GitHub",      category: "Dev",           icon: "🐙", color: "slate",   connected: false, description: "Version control & CI/CD pipeline", fields: [{ label: "Personal Access Token", key: "token", type: "password", placeholder: "ghp_xxxxxxxxxxxx" }, { label: "Repository", key: "repo", type: "text", placeholder: "username/repo" }] },
  { id: "netlify",    name: "Netlify",     category: "Hosting",       icon: "🌿", color: "teal",    connected: false, description: "Deploy & host static sites", fields: [{ label: "API Token", key: "token", type: "password", placeholder: "Netlify API token" }, { label: "Site ID", key: "siteId", type: "text", placeholder: "Site ID" }] },
  { id: "vercel",     name: "Vercel",      category: "Hosting",       icon: "▲",  color: "slate",   connected: false, description: "Serverless deployment platform", fields: [{ label: "API Token", key: "token", type: "password", placeholder: "Vercel token" }] },
  { id: "namecheap",  name: "Namecheap",   category: "Domain",        icon: "🔤", color: "orange",  connected: false, description: "Domain registration & DNS management", fields: [{ label: "Username", key: "user", type: "text", placeholder: "Namecheap username" }, { label: "API Key", key: "apikey", type: "password", placeholder: "API key" }] },
  { id: "zoho",       name: "Zoho",        category: "CRM",           icon: "📊", color: "red",     connected: false, description: "CRM, email & business apps", fields: [{ label: "API Key", key: "key", type: "password", placeholder: "Zoho API key" }] },
  { id: "youtube",    name: "YouTube",     category: "Social Media",  icon: "📺", color: "red",     connected: false, description: "Channel management & analytics", fields: [{ label: "Channel URL", key: "url", type: "text", placeholder: "https://youtube.com/@UniOrbi" }, { label: "API Key", key: "apikey", type: "password", placeholder: "YouTube Data API v3 key" }] },
  { id: "facebook",   name: "Facebook",    category: "Social Media",  icon: "📘", color: "blue",    connected: false, description: "Page management & publishing", fields: [{ label: "Page Access Token", key: "token", type: "password", placeholder: "Facebook Page Token" }] },
  { id: "whatsapp",   name: "WhatsApp",    category: "Messaging",     icon: "💬", color: "green",   connected: false, description: "Business API & broadcast", fields: [{ label: "Phone Number ID", key: "phoneId", type: "text", placeholder: "Phone Number ID" }, { label: "Access Token", key: "token", type: "password", placeholder: "Meta API token" }] },
  { id: "tiktok",     name: "TikTok",      category: "Social Media",  icon: "🎵", color: "cyan",    connected: false, description: "TikTok Business API", fields: [{ label: "App ID", key: "appId", type: "text", placeholder: "TikTok App ID" }, { label: "Access Token", key: "token", type: "password", placeholder: "Access token" }] },
  { id: "instagram",  name: "Instagram",   category: "Social Media",  icon: "📸", color: "pink",    connected: false, description: "Instagram Business Graph API", fields: [{ label: "Access Token", key: "token", type: "password", placeholder: "Instagram Graph API token" }] },
  { id: "twitter",    name: "Twitter / X", category: "Social Media",  icon: "𝕏",  color: "slate",   connected: false, description: "Twitter API v2 integration", fields: [{ label: "API Key", key: "key", type: "password", placeholder: "Twitter API key" }, { label: "Bearer Token", key: "bearer", type: "password", placeholder: "Bearer token" }] },
  { id: "linkedin",   name: "LinkedIn",    category: "Social Media",  icon: "💼", color: "blue",    connected: false, description: "Company page & publishing", fields: [{ label: "Access Token", key: "token", type: "password", placeholder: "LinkedIn API token" }] },
  { id: "telegram",   name: "Telegram",    category: "Messaging",     icon: "✈",  color: "sky",     connected: false, description: "Bot API & channel management", fields: [{ label: "Bot Token", key: "token", type: "password", placeholder: "BotFather token: 12345:ABCDxxx" }] },
];

const CATEGORIES = ["All", "Backend", "Dev", "Hosting", "Domain", "CRM", "Social Media", "Messaging"];

export default function AdminIntegrations() {
  const [configs, setConfigs] = useState<Record<string, Record<string, string>>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.connected]))
  );
  const [activeCategory, setActiveCategory] = useState("All");

  function updateField(id: string, key: string, value: string) {
    setConfigs((prev) => ({ ...prev, [id]: { ...(prev[id] ?? {}), [key]: value } }));
  }

  function saveConfig(id: string) {
    setConnected((prev) => ({ ...prev, [id]: true }));
    setEditing(null);
    toast.success(`${id} configuration saved!`);
  }

  function disconnect(id: string) {
    setConnected((prev) => ({ ...prev, [id]: false }));
    setConfigs((prev) => { const n = { ...prev }; delete n[id]; return n; });
    toast.success(`${id} disconnected`);
  }

  const filtered = activeCategory === "All"
    ? INTEGRATIONS
    : INTEGRATIONS.filter((i) => i.category === activeCategory);

  const connectedCount = Object.values(connected).filter(Boolean).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-heading font-black text-2xl text-white">Integrations & Backend Management</h1>
        <p className="text-slate-400 text-sm">{connectedCount}/{INTEGRATIONS.length} services connected</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat ? "bg-amber-500 text-slate-900" : "glass-card text-slate-400 hover:text-amber-400"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((integration) => {
          const isConnected = connected[integration.id] ?? false;
          const isEditing = editing === integration.id;
          const cfg = configs[integration.id] ?? {};

          return (
            <div key={integration.id} className={`glass-card rounded-2xl p-5 transition-all hover:border-sky-500/30 ${isConnected ? "border-emerald-500/30" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-2xl">
                    {integration.icon}
                  </div>
                  <div>
                    <div className="font-heading font-bold text-white text-sm">{integration.name}</div>
                    <div className="text-slate-500 text-[10px]">{integration.category}</div>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isConnected ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"
                }`}>
                  {isConnected ? "✓ Connected" : "Not Connected"}
                </span>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed mb-3">{integration.description}</p>

              {isEditing && (
                <div className="space-y-2 mb-3 border-t border-sky-500/10 pt-3">
                  {integration.fields.map((field) => (
                    <div key={field.key}>
                      <label className="text-slate-500 text-[10px] block mb-1">{field.label}</label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={cfg[field.key] ?? ""}
                        onChange={(e) => updateField(integration.id, field.key, e.target.value)}
                        className="w-full bg-white/5 border border-sky-500/20 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button onClick={() => saveConfig(integration.id)}
                      className="flex-1 text-xs bg-sky-500 hover:bg-sky-400 text-white rounded-lg py-2 font-semibold transition-all">
                      Save & Connect
                    </button>
                    <button onClick={() => setEditing(null)}
                      className="px-3 text-xs glass-card text-slate-400 rounded-lg py-2 transition-all">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setEditing(integration.id)}
                      className="flex-1 text-xs glass-card text-sky-400 hover:border-sky-500/40 rounded-lg py-2 font-semibold transition-all">
                      {isConnected ? "⚙ Edit Config" : "+ Connect"}
                    </button>
                    {isConnected && (
                      <button onClick={() => disconnect(integration.id)}
                        className="px-3 text-xs glass-card text-red-400 hover:border-red-500/30 rounded-lg py-2 transition-all">
                        ✕
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
