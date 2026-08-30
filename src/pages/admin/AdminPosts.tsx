import { useEffect, useState } from "react";
import { supabase, NewsPost } from "@/lib/supabase";
import { toast } from "sonner";

const EMPTY: Partial<NewsPost> = {
  title: "", title_ur: "", title_ar: "",
  body: "", body_ur: "", body_ar: "",
  category: "Global", author: "Admin",
  is_published: false, featured: false,
  tags: [], image_url: "",
};

const CATEGORIES = ["Global", "Political", "Social", "Media", "Technology", "Educational", "Motivational", "General"];

export default function AdminPosts() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<NewsPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tab, setTab] = useState<"en" | "ur" | "ar">("en");

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from("news_posts").select("*").order("created_at", { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  async function savePost() {
    if (!editing?.title || !editing?.body) { toast.error("Title and body are required"); return; }
    setSaving(true);
    const payload = {
      title: editing.title, title_ur: editing.title_ur || null, title_ar: editing.title_ar || null,
      body: editing.body, body_ur: editing.body_ur || null, body_ar: editing.body_ar || null,
      category: editing.category ?? "Global", author: editing.author ?? "Admin",
      is_published: editing.is_published ?? false, featured: editing.featured ?? false,
      tags: editing.tags ?? [], image_url: editing.image_url || null,
      updated_at: new Date().toISOString(),
    };

    if (editing.id) {
      const { error } = await supabase.from("news_posts").update(payload).eq("id", editing.id);
      if (error) { toast.error(error.message); } else { toast.success("Post updated!"); }
    } else {
      const { error } = await supabase.from("news_posts").insert(payload);
      if (error) { toast.error(error.message); } else { toast.success("Post created!"); }
    }
    setSaving(false);
    setEditing(null);
    fetchPosts();
  }

  async function togglePublish(post: NewsPost) {
    await supabase.from("news_posts").update({ is_published: !post.is_published }).eq("id", post.id);
    fetchPosts();
    toast.success(post.is_published ? "Post unpublished" : "Post published!");
  }

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;
    await supabase.from("news_posts").delete().eq("id", id);
    toast.success("Post deleted");
    fetchPosts();
  }

  function addTag() {
    if (!tagInput.trim()) return;
    setEditing((prev) => ({ ...prev, tags: [...(prev?.tags ?? []), tagInput.trim()] }));
    setTagInput("");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading font-black text-2xl text-white">News Posts</h1>
          <p className="text-slate-400 text-sm">{posts.length} posts total</p>
        </div>
        <button
          onClick={() => { setEditing({ ...EMPTY }); setTab("en"); }}
          className="bg-sky-500 hover:bg-sky-400 text-white font-heading font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
        >
          + New Post
        </button>
      </div>

      {/* Editor Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#060D1A] border border-sky-500/20 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-sky-500/10 flex items-center justify-between sticky top-0 bg-[#060D1A] z-10">
              <h2 className="font-heading font-black text-xl text-white">{editing.id ? "Edit Post" : "New Post"}</h2>
              <button onClick={() => setEditing(null)} className="text-slate-400 hover:text-white text-xl">✕</button>
            </div>

            <div className="p-6 space-y-5">
              {/* Lang tabs */}
              <div className="flex gap-2 mb-4">
                {(["en", "ur", "ar"] as const).map((l) => (
                  <button key={l} onClick={() => setTab(l)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${tab === l ? "bg-sky-500 text-white" : "glass-card text-slate-400"}`}>
                    {l === "en" ? "🇬🇧 EN" : l === "ur" ? "🇵🇰 UR" : "🇸🇦 AR"}
                  </button>
                ))}
              </div>

              {/* EN Fields */}
              {tab === "en" && (<>
                <input placeholder="Title (English) *" value={editing.title ?? ""} onChange={(e) => setEditing(p => ({ ...p, title: e.target.value }))}
                  className="admin-input" />
                <textarea placeholder="Body (English) *" rows={5} value={editing.body ?? ""} onChange={(e) => setEditing(p => ({ ...p, body: e.target.value }))}
                  className="admin-input resize-none" />
              </>)}

              {/* UR Fields */}
              {tab === "ur" && (<>
                <input dir="rtl" placeholder="عنوان (اردو)" value={editing.title_ur ?? ""} onChange={(e) => setEditing(p => ({ ...p, title_ur: e.target.value }))}
                  className="admin-input font-urdu text-right" />
                <textarea dir="rtl" placeholder="متن (اردو)" rows={5} value={editing.body_ur ?? ""} onChange={(e) => setEditing(p => ({ ...p, body_ur: e.target.value }))}
                  className="admin-input font-urdu text-right resize-none" />
              </>)}

              {/* AR Fields */}
              {tab === "ar" && (<>
                <input dir="rtl" placeholder="العنوان (عربي)" value={editing.title_ar ?? ""} onChange={(e) => setEditing(p => ({ ...p, title_ar: e.target.value }))}
                  className="admin-input text-right" />
                <textarea dir="rtl" placeholder="النص (عربي)" rows={5} value={editing.body_ar ?? ""} onChange={(e) => setEditing(p => ({ ...p, body_ar: e.target.value }))}
                  className="admin-input text-right resize-none" />
              </>)}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Category</label>
                  <select value={editing.category ?? "Global"} onChange={(e) => setEditing(p => ({ ...p, category: e.target.value }))}
                    className="admin-input">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Author</label>
                  <input placeholder="Author" value={editing.author ?? ""} onChange={(e) => setEditing(p => ({ ...p, author: e.target.value }))}
                    className="admin-input" />
                </div>
              </div>

              <input placeholder="Image URL (optional)" value={editing.image_url ?? ""} onChange={(e) => setEditing(p => ({ ...p, image_url: e.target.value }))}
                className="admin-input" />

              {/* Tags */}
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Tags</label>
                <div className="flex gap-2">
                  <input placeholder="Add tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    className="admin-input flex-1" />
                  <button onClick={addTag} className="px-4 py-2 bg-sky-500/20 text-sky-400 rounded-lg text-sm">Add</button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(editing.tags ?? []).map((tag, i) => (
                    <span key={i} className="flex items-center gap-1 bg-sky-500/10 text-sky-400 text-xs px-2.5 py-1 rounded-full">
                      #{tag}
                      <button onClick={() => setEditing(p => ({ ...p, tags: p?.tags?.filter((_, j) => j !== i) }))} className="text-red-400 ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.is_published ?? false}
                    onChange={(e) => setEditing(p => ({ ...p, is_published: e.target.checked }))}
                    className="w-4 h-4 rounded" />
                  <span className="text-slate-300 text-sm">Published</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editing.featured ?? false}
                    onChange={(e) => setEditing(p => ({ ...p, featured: e.target.checked }))}
                    className="w-4 h-4 rounded" />
                  <span className="text-slate-300 text-sm">Featured</span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={savePost} disabled={saving}
                  className="flex-1 bg-sky-500 hover:bg-sky-400 text-white font-heading font-bold py-3 rounded-xl transition-all disabled:opacity-50">
                  {saving ? "Saving..." : editing.id ? "Update Post" : "Publish Post"}
                </button>
                <button onClick={() => setEditing(null)}
                  className="px-6 glass-card text-slate-400 hover:text-white rounded-xl transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Posts Table */}
      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="glass-card rounded-xl h-16 animate-pulse" />)}</div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="divide-y divide-sky-500/10">
            {posts.length === 0 && (
              <div className="p-12 text-center text-slate-400">No posts yet. Click "+ New Post" to get started.</div>
            )}
            {posts.map((p) => (
              <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-sky-500/5 transition-all">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm line-clamp-1">{p.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded">{p.category}</span>
                    <span className="text-slate-500 text-xs">{new Date(p.created_at).toLocaleDateString()}</span>
                    <span className="text-slate-500 text-xs">👁 {p.views}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => togglePublish(p)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      p.is_published ? "bg-emerald-500/20 text-emerald-400 hover:bg-red-500/20 hover:text-red-400" : "bg-slate-700 text-slate-400 hover:bg-emerald-500/20 hover:text-emerald-400"
                    }`}>
                    {p.is_published ? "✓ Live" : "Draft"}
                  </button>
                  <button onClick={() => { setEditing(p); setTab("en"); }}
                    className="text-xs px-3 py-1.5 glass-card text-sky-400 hover:border-sky-500/60 rounded-lg transition-all">
                    Edit
                  </button>
                  <button onClick={() => deletePost(p.id)}
                    className="text-xs px-3 py-1.5 glass-card text-red-400 hover:border-red-500/40 rounded-lg transition-all">
                    Del
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`.admin-input { width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(14,165,233,0.2); border-radius:12px; padding:10px 14px; color:#fff; font-size:14px; outline:none; transition:border-color 0.2s; }
      .admin-input:focus { border-color:rgba(14,165,233,0.5); }
      .admin-input option { background:#060D1A; }`}</style>
    </div>
  );
}
