"use client";

import { useEffect } from "react";

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
  useEffect(() => {
    if (!PID || !SLOT) {
      return;
    }

    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [PID, SLOT]);

  if (!PID || !SLOT) {
    return null;
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-pub-${PID}`}
      data-ad-slot={SLOT}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};
export default GoogleAdSenseComponent;
