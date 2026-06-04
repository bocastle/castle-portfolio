import Information from "@/components/Information";
import ProfileTabs from "@/components/ProfileTabs";
import Projects from "@/components/Projects";
import WorkHistory from "@/components/WorkHistory";
import { getPublicImageUrl } from "@/utils/image-url";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "castle log",
  description: "개발과 일상을 공유 합니다.",
  openGraph: {
    title: `castle log`,
    description: "개발과 일상을 공유 합니다.",
    url: "https://bocelog.vercel.app/workHistory",
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

export default function WorkHistoryPage() {
  return (
    <div className="mx-auto my-4 mb-20 flex flex-col items-center gap-14 px-6 py-8 sm:gap-16 sm:px-8 md:my-12 md:gap-20">
      <Information />
      <ProfileTabs projects={<Projects />} workHistory={<WorkHistory />} />
    </div>
  );
}
