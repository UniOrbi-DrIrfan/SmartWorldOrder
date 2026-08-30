import { useState } from "react";

const PLATFORMS = [
  { id: "youtube",   name: "YouTube",    icon: "📺", color: "red",     handle: "@UniOrbi",           url: "https://youtube.com/@UniOrbi",            status: "Active" },
  { id: "instagram", name: "Instagram",  icon: "📸", color: "pink",    handle: "@smartworldorder",   url: "https://instagram.com/smartworldorder",   status: "Active" },
  { id: "twitter",   name: "Twitter/X",  icon: "𝕏",  color: "slate",   handle: "@SmartWorldOrd",     url: "https://twitter.com/SmartWorldOrd",       status: "Active" },
  { id: "facebook",  name: "Facebook",   icon: "📘", color: "blue",    handle: "SMART WORLD ORDER",  url: "https://facebook.com/SmartWorldOrder",    status: "Active" },
  { id: "tiktok",    name: "TikTok",     icon: "🎵", color: "cyan",    handle: "@smartworldorder",   url: "https://tiktok.com/@smartworldorder",     status: "Active" },
  { id: "telegram",  name: "Telegram",   icon: "✈",  color: "sky",     handle: "@smartworldorder",   url: "https://t.me/smartworldorder",            status: "Active" },
  { id: "linkedin",  name: "LinkedIn",   icon: "💼", color: "blue",    handle: "smartworldorder",    url: "https://linkedin.com/company/smartworldorder", status: "Active" },
  { id: "github",    name: "GitHub",     icon: "🐙", color: "slate",   handle: "smartworldorder",    url: "https://github.com/smartworldorder",      status: "Active" },
];

const SECTIONS = [
  { id: "accounts",     label: "Accounts & Channels",     icon: "🌐" },
  { id: "posting",      label: "Post & Announce",          icon: "📢" },
  { id: "communities",  label: "Community Building",       icon: "👥" },
  { id: "marketing",    label: "Marketing & Publicity",    icon: "📣" },
  { id: "invitations",  label: "Invitations & Adds",       icon: "✉️" },
];

export default function AdminPersonal() {
  const [activeSection, setActiveSection] = useState("accounts");
  const [announcement, setAnnouncement] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  function togglePlatform(id: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-heading font-black text-2xl text-white">My Personal Management</h1>
        <p className="text-slate-400 text-sm">SMART WORLD ORDER — Dr M Irfan Qadir Thaheem</p>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-heading font-semibold transition-all ${
              activeSection === s.id ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "glass-card text-slate-400 hover:text-amber-400"
            }`}>
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* Accounts Section */}
      {activeSection === "accounts" && (
        <div className="space-y-4">
          <h2 className="font-heading font-bold text-white text-lg mb-4">All Social Media Accounts & Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PLATFORMS.map((p) => (
              <div key={p.id} className="glass-card rounded-2xl p-5 hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-2xl shrink-0">
                    {p.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-bold text-white">{p.name}</div>
                    <div className="text-slate-400 text-sm">{p.handle}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">{p.status}</span>
                    <a href={p.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-sky-400 hover:underline">Visit →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post & Announce Section */}
      {activeSection === "posting" && (
        <div className="max-w-2xl">
          <h2 className="font-heading font-bold text-white text-lg mb-6">Create Announcement</h2>

          <div className="glass-card rounded-2xl p-6 space-y-5">
            <div>
              <label className="text-slate-400 text-xs mb-2 block">Announcement / Post Content</label>
              <textarea
                placeholder="Write your announcement here... (will be adapted for each platform)"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                rows={6}
                className="w-full bg-white/5 border border-sky-500/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-sky-500/50 resize-none"
              />
              <div className="text-slate-500 text-xs mt-1 text-right">{announcement.length} characters</div>
            </div>

            <div>
              <label className="text-slate-400 text-xs mb-3 block">Select Platforms to Post</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PLATFORMS.map((p) => (
                  <button key={p.id} onClick={() => togglePlatform(p.id)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                      selectedPlatforms.includes(p.id)
                        ? "bg-sky-500/20 border-sky-500/50 text-sky-400"
                        : "bg-white/5 border-white/10 text-slate-400 hover:border-sky-500/30"
                    }`}>
                    <span className="text-lg">{p.icon}</span>
                    <span className="hidden sm:block">{p.name}</span>
                    {selectedPlatforms.includes(p.id) && <span className="ml-auto text-sky-400">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const all = PLATFORMS.map((p) => p.id);
                  setSelectedPlatforms(selectedPlatforms.length === all.length ? [] : all);
                }}
                className="text-xs glass-card text-amber-400 px-4 py-2 rounded-xl transition-all hover:border-amber-500/40"
              >
                {selectedPlatforms.length === PLATFORMS.length ? "Deselect All" : "Select All"}
              </button>
              <span className="text-slate-500 text-xs">{selectedPlatforms.length} platform(s) selected</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  const urls: Record<string, string> = {
                    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(announcement)}`,
                    facebook: `https://facebook.com/sharer/sharer.php?quote=${encodeURIComponent(announcement)}`,
                    telegram: `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(announcement)}`,
                    whatsapp: `https://wa.me/?text=${encodeURIComponent(announcement)}`,
                    linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`,
                  };
                  selectedPlatforms.forEach((pid) => {
                    if (urls[pid]) window.open(urls[pid], "_blank", "noopener,width=600,height=500");
                  });
                }}
                disabled={!announcement.trim() || selectedPlatforms.length === 0}
                className="bg-sky-500 hover:bg-sky-400 text-white font-heading font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-40"
              >
                📢 Post to Selected
              </button>
              <button
                onClick={() => { setAnnouncement(""); setSelectedPlatforms([]); }}
                className="glass-card text-slate-400 hover:text-white rounded-xl py-3 text-sm transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Communities Section */}
      {activeSection === "communities" && (
        <div className="max-w-3xl">
          <h2 className="font-heading font-bold text-white text-lg mb-6">Community Building Setups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "YouTube Community", desc: "Post community updates, polls, behind-the-scenes to UniOrbi subscribers.", icon: "📺", action: "https://studio.youtube.com" },
              { title: "Telegram Channel", desc: "Broadcast announcements and exclusive content to t.me/smartworldorder.", icon: "✈", action: "https://t.me/smartworldorder" },
              { title: "Facebook Group", desc: "Build and moderate the SMART WORLD ORDER Facebook community.", icon: "📘", action: "https://facebook.com/SmartWorldOrder" },
              { title: "WhatsApp Broadcast", desc: "Set up broadcast list for direct updates to subscribers.", icon: "💬", action: `https://wa.me/03004737757` },
              { title: "LinkedIn Followers", desc: "Engage professional network with thought leadership content.", icon: "💼", action: "https://linkedin.com/company/smartworldorder" },
              { title: "Instagram Community", desc: "Build community through stories, reels & close friends.", icon: "📸", action: "https://instagram.com/smartworldorder" },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-xl p-5 hover:-translate-y-0.5 transition-all">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-heading font-bold text-white mb-1">{item.title}</div>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">{item.desc}</p>
                <a href={item.action} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:underline font-semibold">Open Platform →</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marketing Section */}
      {activeSection === "marketing" && (
        <div className="max-w-3xl">
          <h2 className="font-heading font-bold text-white text-lg mb-6">Marketing & Publicity Strategy</h2>
          <div className="space-y-4">
            {[
              { category: "Content Strategy", items: ["Post 3-5 times daily across all platforms", "Morning: Reality/Fact post", "Afternoon: Analysis/Insight", "Evening: Global Family message", "Night: Deep reflection + tomorrow teaser"] },
              { category: "Hashtag Strategy", items: ["#SmartWorldOrder", "#GlobalFamily", "#Truth", "#Justice", "#HiddenFacts", "#Unity", "#Integrity", "#DoubleStandards"] },
              { category: "Engagement Tactics", items: ["Respond to every comment within 2 hours", "Pin best posts/tweets", "Use Instagram Stories for polls", "Cross-promote between platforms", "Collaborate with similar channels"] },
              { category: "Growth Goals", items: ["1K YouTube subscribers: Week 4", "10K Instagram followers: Month 3", "5K Telegram members: Month 2", "500 website subscribers: Month 1"] },
            ].map((section) => (
              <div key={section.category} className="glass-card rounded-xl p-5">
                <h3 className="font-heading font-bold text-amber-400 mb-3">{section.category}</h3>
                <ul className="space-y-1.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5 shrink-0">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invitations Section */}
      {activeSection === "invitations" && (
        <div className="max-w-2xl">
          <h2 className="font-heading font-bold text-white text-lg mb-6">Invitations & Presentation Templates</h2>

          <div className="space-y-4">
            {[
              {
                label: "YouTube Subscribe Invitation",
                text: `🌍 SMART WORLD ORDER\n\nBoth eyes on what's really going on...\n\n📰 Realities & Facts at your doorstep\n✊ Against Injustice & Double Standards\n🔍 We bring what they hide!\n\n👉 Subscribe: https://youtube.com/@UniOrbi\n\nIn-sha-Allah Azza-wa-Jall`,
              },
              {
                label: "WhatsApp Broadcast Message",
                text: `🌟 *SMART WORLD ORDER*\nNether a Global Village nor a Global Community,\nIt's a *Global Family Platform* 🌍\n\n👁️ *Both eyes on what's really going on*\n📰 Realities & Facts at your doorstep\n✊ Against Injustice & Double Standards\n\n🔔 Follow us:\n📺 YouTube: @UniOrbi\n📱 Instagram: @smartworldorder\n💬 Telegram: t.me/smartworldorder\n\n_In-sha-Allah Azza-wa-Jall_`,
              },
              {
                label: "Twitter/X Thread Starter",
                text: `🌍 SMART WORLD ORDER\n\nNeither a Global Village\nNor a Global Community\nIt's a Global Family Platform\n\n1/ Both eyes on what's really going on...`,
              },
            ].map((template) => (
              <div key={template.label} className="glass-card rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-bold text-white text-sm">{template.label}</h4>
                  <button
                    onClick={() => { navigator.clipboard.writeText(template.text); }}
                    className="text-xs text-amber-400 hover:underline"
                  >
                    📋 Copy
                  </button>
                </div>
                <pre className="text-slate-400 text-xs leading-relaxed whitespace-pre-wrap bg-black/20 rounded-lg p-3">
                  {template.text}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
