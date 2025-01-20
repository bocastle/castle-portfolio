import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "../components/Navbar";
import "./globals.css";
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
  title: "castle log",
  description: "개발과 일상을 공유 합니다.",
  openGraph: {
    title: `castle log`,
    description: "개발과 일상을 공유 합니다.",
    url: "https://bocelog.vercel.app",
    siteName: "castle log",
    locale: "ko_KR",
    type: "website",
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
  const GTAG_ID = process.env.GTAG_ID;
  return (
    <html lang="ko">
      {/*  Google Tag Manager  */}
      <GoogleTagManager gtmId={`${GTM_ID}`} />
      {/* End Google Tag Manager  */}
      <GoogleAnalytics gaId={`${GTAG_ID}`} />

      <body
        className={`bg-slate-900 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <SpeedInsights />
        <Analytics />
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript)  */}
      </body>
    </html>
  );
}
