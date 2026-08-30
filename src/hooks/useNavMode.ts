import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ROUTES = ["/", "/news", "/about", "/channels", "/platforms", "/manifesto"];

export function useNavMode(enabled: { swipe: boolean; keyboard: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled.swipe) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;

      const idx = ROUTES.indexOf(location.pathname);
      if (dx < 0 && idx < ROUTES.length - 1) navigate(ROUTES[idx + 1]);
      else if (dx > 0 && idx > 0) navigate(ROUTES[idx - 1]);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [enabled.swipe, location.pathname, navigate]);

  useEffect(() => {
    if (!enabled.keyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const idx = ROUTES.indexOf(location.pathname);
      if (e.key === "ArrowRight" && idx < ROUTES.length - 1) navigate(ROUTES[idx + 1]);
      else if (e.key === "ArrowLeft" && idx > 0) navigate(ROUTES[idx - 1]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled.keyboard, location.pathname, navigate]);
}
