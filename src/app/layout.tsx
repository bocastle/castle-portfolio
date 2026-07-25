import CampaignTracker from "@/components/Analytics/CampaignTracker";
import ClarityTracker from "@/components/Analytics/ClarityTracker";
import EngagementTracker from "@/components/Analytics/EngagementTracker";
import OutboundLinkTracker from "@/components/Analytics/OutboundLinkTracker";
import { GoogleAdSense } from "@/components/GoogleAds/GoogleAdSense";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { IBM_Plex_Sans_KR } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import { getPublicImageUrl } from "../utils/image-url";
import "./globals.css";
import ThemeScript from "./ThemeScript";

const SITE_URL = "https://bocelog.vercel.app";

// 본문·제목: 한글과 라틴을 한 가족으로 다루는 IBM Plex Sans KR.
// 숫자·메타데이터: 이미 리포에 있는 Geist Mono(추가 다운로드 없음).
const plexSansKR = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans-kr",
  display: "swap",
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
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
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
        <GoogleAdSense />
        <ThemeScript />
      </head>

      <body
        className={`${plexSansKR.variable} ${geistMono.variable} antialiased`}
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
      </body>
    </html>
  );
}
