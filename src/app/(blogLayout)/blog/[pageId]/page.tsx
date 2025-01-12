import type { Metadata } from "next";
import {
  getArticleCategoryList,
  getArticlePageHeaderData,
} from "../../api/notion";
import { ArticleCategory } from "../components/ArticleCategory";
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
  const articleCategoryList = await getArticleCategoryList();
  return (
    <div className="text-white items-start mx-auto p-8 flex gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center">
      <div className="w-1/5 items-center max-md:hidden max-sm:hidden">
        <ArticleCategory list={articleCategoryList} />
      </div>
      <div className="w-3/5 items-start max-md:w-full max-sm:w-full flex flex-col md:gap-5 md:my-4 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center">
        <PageHeader pageId={pageId} />
        <PageContent pageId={pageId} />
        <PageFooter pageId={pageId} />
      </div>
    </div>
  );
}
