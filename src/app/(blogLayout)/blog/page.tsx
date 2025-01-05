import BlogList from "@/components/BlogList";
import { getArticleTagList, getPageList } from "../api/notion";
import { ArticleFilterTagList } from "./components/ArticleTagList";
import { ArticleTagTitle } from "./components/ArticleTagTitle";

export interface IBlogPagelist {
  cover: string;
  id: string;
  created_time: string;
}
export default async function BlogPage() {
  const List = await getPageList();
  const TagList = await getArticleTagList();
  // console.log("blog", List);
  // console.log("TagList", TagList);

  return (
    <div className="items-center mx-auto p-8 flex flex-col gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5">
      <div className="w-3/5 max-md:w-4/5 max-sm:w-4/5 flex flex-col md:gap-5 md:my-4 sm:gap-5">
        <ArticleTagTitle />
        <ArticleFilterTagList />
      </div>
      <BlogList list={List} />
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

export async function generateStaticParams() {
  const List = await getPageList();
  return List;
}
