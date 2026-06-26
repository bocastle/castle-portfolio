"use client";

import { useEffect } from "react";
import { trackEvent } from "@/utils/analytics";

const getAnchorFromClick = (target: EventTarget | null) => {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLAnchorElement>("a[href]");
};

const OutboundLinkTracker = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = getAnchorFromClick(event.target);

      if (!anchor) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);

      if (!["http:", "https:"].includes(url.protocol)) {
        return;
      }

      if (url.origin === window.location.origin) {
        return;
      }

      trackEvent("Outbound Link Click", {
        href: url.href,
        host: url.hostname,
        label:
          anchor.textContent?.trim() ||
          anchor.getAttribute("aria-label") ||
          "link",
        path: window.location.pathname || "/",
      });
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
};

export default OutboundLinkTracker;
