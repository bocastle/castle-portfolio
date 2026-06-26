"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/utils/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 90, 100] as const;
const ENGAGED_SECONDS = [15, 30, 60, 120] as const;

const getPath = () => window.location.pathname || "/";

const getScrollDepth = () => {
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;
  const scrollableHeight = scrollHeight - clientHeight;

  if (scrollableHeight <= 0) {
    return 100;
  }

  return Math.min(
    100,
    Math.max(0, Math.round((scrollTop / scrollableHeight) * 100))
  );
};

const EngagementTracker = () => {
  const trackedScrollDepths = useRef(new Set<number>());
  const maxScrollDepth = useRef(0);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const path = getPath();

    const handleScroll = () => {
      const depth = getScrollDepth();
      maxScrollDepth.current = Math.max(maxScrollDepth.current, depth);

      SCROLL_MILESTONES.forEach((milestone) => {
        if (depth < milestone || trackedScrollDepths.current.has(milestone)) {
          return;
        }

        trackedScrollDepths.current.add(milestone);
        trackEvent("Scroll Depth", {
          depth: milestone,
          max_scroll_depth: maxScrollDepth.current,
          path,
        });
      });
    };

    const timers = ENGAGED_SECONDS.map((seconds) =>
      window.setTimeout(() => {
        trackEvent("Engaged Time", {
          seconds,
          path,
        });
      }, seconds * 1000)
    );

    const handlePageExit = () => {
      trackEvent("Page Exit", {
        duration_seconds: Math.round(
          (Date.now() - startedAt.current) / 1000
        ),
        max_scroll_depth: maxScrollDepth.current,
        path,
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pagehide", handlePageExit);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pagehide", handlePageExit);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
};

export default EngagementTracker;
