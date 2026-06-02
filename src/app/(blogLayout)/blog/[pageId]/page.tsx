import { ScrollProgress } from "@/components/ScrollProgressbar";
import type { Metadata } from "next";
import { getArticlePageHeaderData } from "../../api/blog";
import PageContent from "./components/PageContent";
import PageFooter from "./components/PageFooter";
import PageHeader from "./components/PageHeader";
type Props = {
  params: Promise<{ pageId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageId = (await params).pageId;
  const {
    title: articleTitle,
    description,
    thumbnailUrl,
  } = await getArticlePageHeaderData(pageId);
  const title = `${articleTitle} | castle log`;

  return {
    title,
    description,
    openGraph: {
      title: title,
      description: description,
      siteName: title,
      locale: "ko_KR",
      type: "website",
      url: "https://bocelog.vercel.app/blog/" + pageId,
      images: {
        url: thumbnailUrl,
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
}

export default async function ArticleDetailPage({ params }: Props) {
  const pageId = (await params).pageId;

  return (
    <div className="flex w-full max-w-7xl flex-col items-start md:gap-5 md:my-4 sm:gap-5 max-lg:items-center max-md:w-full max-md:items-center max-sm:w-full max-sm:items-center">
      <ScrollProgress />
      <PageHeader pageId={pageId} />
      <PageContent pageId={pageId} />
      <PageFooter pageId={pageId} />
    </div>
  );
}
