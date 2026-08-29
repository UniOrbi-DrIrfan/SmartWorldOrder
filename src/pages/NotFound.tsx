import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="space-y-6">
        <div className="text-8xl font-heading font-black text-gradient-blue">404</div>
        <h1 className="font-heading font-bold text-2xl text-white">
          Page Not Found
        </h1>
        <p className="text-slate-400">
          This page doesn't exist in our Global Family yet.
        </p>
        <Link
          to="/"
          className="inline-block glass-card text-sky-400 font-heading font-bold px-6 py-3 rounded-xl hover:border-sky-500/50 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
