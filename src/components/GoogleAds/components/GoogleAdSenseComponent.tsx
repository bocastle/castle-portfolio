import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export const GoogleAdSenseComponent = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  const PID = process.env.PID;
  const SLOT = process.env.SLOT;
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
