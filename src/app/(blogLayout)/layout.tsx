import { Metadata } from "next";
import { getPublicImageUrl } from "../../utils/image-url";
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

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/*
        좌측 카테고리 사이드바를 걷어냈다. 문서사이트처럼 보이게 만드는 뼈대였고,
        카테고리는 /categories와 상단 링크로 접근한다.
        id는 무한스크롤 IntersectionObserver의 root라 유지한다.
      */}
      <div
        className="mx-auto mb-20 flex w-full max-w-7xl flex-col items-center px-6 py-10 sm:px-8"
        id={"blog_layout_container"}
      >
        {children}
      </div>
    </>
  );
}
