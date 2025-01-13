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
    other: {
      google: `${process.env.GOOGLE_SITE_VERIFICATION_KEY}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`bg-slate-900 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
