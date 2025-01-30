import Script from "next/script";
import { FunctionComponent } from "react";

export const GoogleAdSense: FunctionComponent = () => {
  const PID = process.env.PID;

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      async={true}
      id="Adsense-id"
      data-ad-client={`ca-pub-${PID}`}
      strategy="beforeInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    />
  );
};
