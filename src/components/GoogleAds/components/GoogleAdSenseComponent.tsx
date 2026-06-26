"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}
interface Props {
  PID: string;
  SLOT: string;
}

const GoogleAdSenseComponent = ({ PID, SLOT }: Props) => {
  const slotRef = useRef<HTMLModElement>(null);
  const [isEmptySlot, setIsEmptySlot] = useState(false);

  useEffect(() => {
    if (!PID || !SLOT) {
      return;
    }

    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [PID, SLOT]);

  useEffect(() => {
    const slot = slotRef.current;

    if (!slot) {
      return;
    }

    const syncEmptyState = () => {
      const adStatus = slot.getAttribute("data-ad-status");
      const isProcessed = slot.getAttribute("data-adsbygoogle-status") === "done";
      const hasRenderedFrame = slot.querySelectorAll("iframe").length > 0;

      setIsEmptySlot(
        adStatus === "unfilled" || (isProcessed && !hasRenderedFrame)
      );
    };

    const observer = new MutationObserver(syncEmptyState);
    observer.observe(slot, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    const timeoutId = window.setTimeout(syncEmptyState, 4000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!PID || !SLOT) {
    return null;
  }

  return (
    <ins
      ref={slotRef}
      className="adsbygoogle"
      data-ad-empty={isEmptySlot ? "true" : undefined}
      style={{ display: "block" }}
      data-ad-client={`ca-pub-${PID}`}
      data-ad-slot={SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
export default GoogleAdSenseComponent;
