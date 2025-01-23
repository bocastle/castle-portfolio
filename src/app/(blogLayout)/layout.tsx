import { Metadata } from "next";
import { getArticleCategoryList } from "./api/notion";
import { ArticleCategory } from "./components/ArticleCategory";
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
      url: `${process.env.NEXT_PUBLIC_IMG}/7nxjpqB/image.png`,
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
  const articleCategoryList = await getArticleCategoryList();
  return (
    <div
      className="items-start mx-auto p-8 flex gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center"
      id={"blog_layout_container"}
    >
      <div className="w-1/5 items-center max-lg:hidden max-md:hidden max-sm:hidden">
        <ArticleCategory list={articleCategoryList} />
      </div>
      {children}
    </div>
  );
}
