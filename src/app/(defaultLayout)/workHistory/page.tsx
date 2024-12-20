import Information from "@/components/Information";
import WorkHistory from "@/components/WorkHistory";
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
      url: `${process.env.NEXT_PUBLIC_IMG}/7nxjpqB/image.png`,
    },
  },
};

export default function WorkHistoryPage() {
  return (
    <div className="items-center mx-auto p-8 flex flex-col gap-28 my-4 mb-20 md:gap-32 md:my-20 sm:gap-5">
      <Information />
      <WorkHistory />
    </div>
  );
}
