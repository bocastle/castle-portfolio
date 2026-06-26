import { ScrollProgress } from "@/components/ScrollProgressbar";
import BlogAdSenseSlot from "@/components/GoogleAds/BlogAdSenseSlot";
import type { Metadata } from "next";
import { fetchArticlePageContent, getArticlePageHeaderData } from "../../api/blog";
import { BlogTocSidebar } from "@/components/BlogDetail";
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
  const { parent } = await fetchArticlePageContent(pageId);
  const content = parent as string;

  return (
    <div className="grid w-full max-w-7xl grid-cols-1 items-start md:my-4 xl:grid-cols-[minmax(0,56rem)_16rem] xl:gap-8 max-lg:justify-items-center max-md:w-full max-sm:w-full">
      <ScrollProgress />
      <div className="flex w-full min-w-0 max-w-4xl flex-col items-start md:gap-5 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center">
        <PageHeader pageId={pageId} />
        <PageContent content={content} />
        <BlogAdSenseSlot className="my-8" />
        <PageFooter pageId={pageId} />
      </div>
      <BlogTocSidebar content={content} />
    </div>
  );
}
