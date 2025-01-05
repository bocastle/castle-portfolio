import BlogDetail from "@/components/BlogDetail";

import type { Metadata } from "next";
import {
  fetchArticlePageContent,
  getArticlePageHeaderData,
} from "../../api/notion";
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
  // console.log("pageId", pageId);

  const { parent } = await fetchArticlePageContent(pageId);

  return (
    <div className="items-start mx-auto px-80 flex flex-col gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5">
      <BlogDetail content={parent as string} />
    </div>
  );
}

// // 이 함수는 Server Side에서 빌드 타임에 호출된다.
// // Client Side에서는 호출되지 않으므로 직접 데이터베이스 쿼리를 수행할 수도 있다.
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams({ params }: Props) {
  const pageId = (await params).pageId;
  const { parent } = await fetchArticlePageContent(pageId);
  return parent;
}
