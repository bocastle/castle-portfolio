import GoogleAdSenseComponent from "@/components/GoogleAds/components/GoogleAdSenseComponent";
import CampaignTracker from "@/components/Analytics/CampaignTracker";
import ClarityTracker from "@/components/Analytics/ClarityTracker";
import EngagementTracker from "@/components/Analytics/EngagementTracker";
import OutboundLinkTracker from "@/components/Analytics/OutboundLinkTracker";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAdSense } from "../components/GoogleAds/GoogleAdSense";
import Navbar from "../components/Navbar";
import { getPublicImageUrl } from "../utils/image-url";
import "./globals.css";
import ThemeScript from "./ThemeScript";

const SITE_URL = "https://bocelog.vercel.app";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "castle log",
  description: "개발과 일상을 공유 합니다.",
  openGraph: {
    title: `castle log`,
    description: "개발과 일상을 공유 합니다.",
    url: SITE_URL,
    siteName: "castle log",
    locale: "ko_KR",
    type: "website",
    images: {
      url: getPublicImageUrl("7nxjpqB/image.png"),
    },
  },
  verification: {
    google: `${process.env.GOOGLE_SITE_VERIFICATION_KEY}`,
    other: {
      "naver-site-verification": `${process.env.NAVER_SITE_VERIFICATION_KEY}`,
      "google-adsense-account": `${process.env.GOOGLE_ADSENSE_ACCOUNT}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GTM_ID = process.env.GTM_ID;
  const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  const PID = process.env.PID ?? "";
  const SLOT = process.env.SLOT ?? "";
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <GoogleAdSense />
        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
        <ThemeScript />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <SpeedInsights />
        <Analytics />
        <CampaignTracker />
        <EngagementTracker />
        <OutboundLinkTracker />
        <ClarityTracker projectId={CLARITY_PROJECT_ID} />
        {GTM_ID ? (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        ) : null}
        <GoogleAdSenseComponent PID={PID} SLOT={SLOT} />
      </body>
    </html>
  );
}
