import type { Metadata } from "next";
import { getArticlePageHeaderData } from "../../api/notion";
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
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const pageId = (await params).pageId;

  return (
    <div className="text-white items-start mx-auto md:px-80 flex flex-col gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5 max-md:p-1">
      <PageHeader pageId={pageId} />
      <PageContent pageId={pageId} />
      <PageFooter pageId={pageId} />
    </div>
  );
}
