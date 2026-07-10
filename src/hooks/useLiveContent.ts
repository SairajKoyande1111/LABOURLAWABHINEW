import { useEffect, useRef } from 'react';

/**
 * Keeps CMS-driven content in sync with MongoDB without a manual page refresh.
 * Re-runs `fetcher` on an interval and whenever the tab regains focus/visibility,
 * so edits made in the admin panel show up on the live site automatically.
 *
 * @param fetcher   Function that fetches fresh data and applies it (e.g. calls setState).
 * @param intervalMs How often to poll while the tab is visible. Default 15s.
 */
export function useLiveContent(fetcher: () => void, intervalMs = 15000) {
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    // Throttle so 'focus' and 'visibilitychange' firing together on the same
    // tab-regain event don't trigger two back-to-back fetches.
    const MIN_GAP_MS = 1000;
    let lastRun = 0;
    const tick = () => {
      const now = Date.now();
      if (now - lastRun < MIN_GAP_MS) return;
      lastRun = now;
      fetcherRef.current();
    };

    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') tick();
    }, intervalMs);

    const onFocus = () => tick();
    const onVisibility = () => { if (document.visibilityState === 'visible') tick(); };

    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearInterval(id);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [intervalMs]);
}
