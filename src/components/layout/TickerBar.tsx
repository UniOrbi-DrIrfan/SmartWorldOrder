import { TICKER_ITEMS } from "@/constants/brand";

export default function TickerBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="bg-sky-600/90 border-b border-sky-400/40 py-1.5 overflow-hidden relative z-50">
      <div className="flex items-center gap-4">
        <div className="bg-amber-500 text-slate-900 font-heading font-bold text-xs px-3 py-1 shrink-0 ml-2 rounded">
          LIVE
        </div>
        <div className="ticker-wrapper flex-1">
          <div className="ticker-content text-sm font-semibold text-white tracking-wide">
            {items.map((item, i) => (
              <span key={i} className="mr-16">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
