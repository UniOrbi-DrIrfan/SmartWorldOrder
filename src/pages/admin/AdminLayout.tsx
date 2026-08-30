import { useState } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAdminStore } from "@/stores/adminStore";
import { toast } from "sonner";

export function AdminLogin() {
  const { isAuthenticated, login } = useAdminStore();
  const [pw, setPw] = useState("");
  const [shake, setShake] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(pw)) {
      setShake(true);
      toast.error("Wrong password!");
      setTimeout(() => setShake(false), 600);
      setPw("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]" />
      <div className={`relative glass-card-gold rounded-3xl p-10 w-full max-w-md text-center transition-all ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
        <div className="text-6xl mb-4">🛡️</div>
        <h1 className="font-heading font-black text-2xl text-white mb-1">Admin Panel</h1>
        <p className="text-slate-400 text-sm mb-8">SMART WORLD ORDER · Command Center</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="w-full bg-white/5 border border-amber-500/20 rounded-xl px-5 py-4 text-white text-center text-xl tracking-[0.5em] placeholder-slate-600 placeholder:text-base placeholder:tracking-normal focus:outline-none focus:border-amber-500/60 transition-all"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-heading font-black py-4 rounded-xl text-lg transition-all hover:shadow-[0_4px_20px_rgba(245,158,11,0.5)]"
          >
            🔓 Access Admin Panel
          </button>
        </form>

        <p className="text-slate-600 text-xs mt-6">
          Unauthorized access is strictly prohibited.
        </p>
        <Link to="/" className="block mt-3 text-sky-400 text-xs hover:underline">← Back to Website</Link>
      </div>

      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-10px); }
          40%,80% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}

const ADMIN_NAV = [
  { path: "/admin/dashboard",     icon: "📊", label: "Dashboard" },
  { path: "/admin/posts",         icon: "📝", label: "Posts" },
  { path: "/admin/subscribers",   icon: "👥", label: "Subscribers" },
  { path: "/admin/analytics",     icon: "📈", label: "Analytics" },
  { path: "/admin/integrations",  icon: "🔌", label: "Integrations" },
  { path: "/admin/personal",      icon: "👤", label: "My Management" },
];

export function AdminLayout() {
  const { isAuthenticated, logout } = useAdminStore();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen flex bg-[#030710]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} shrink-0 bg-[#050A14] border-r border-amber-500/10 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-amber-500/10 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <div className="font-heading font-black text-xs text-amber-400">ADMIN</div>
              <div className="text-slate-500 text-[10px]">SWO Control Center</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white p-1">
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-heading font-semibold transition-all ${
                location.pathname === item.path
                  ? "bg-amber-500/20 text-amber-400"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-amber-500/10 space-y-2">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-slate-500 hover:text-sky-400 transition-all`}
          >
            <span>🌐</span>
            {sidebarOpen && <span>View Website</span>}
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-all"
          >
            <span>🔒</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
