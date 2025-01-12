import BlogList from "@/components/BlogList";
import {
  getArticleCategoryList,
  getArticleTagList,
  getPageList,
} from "../api/notion";
import { ArticleCategory } from "./components/ArticleCategory";
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
  const articleCategoryList = await getArticleCategoryList();
  console.log("articleCategoryList", articleCategoryList);
  return (
    <div className="items-start mx-auto p-8 flex gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center">
      <div className="w-1/5 items-center max-lg:hidden max-md:hidden max-sm:hidden">
        <ArticleCategory list={articleCategoryList} />
      </div>
      <div className="w-3/5 items-start max-lg:w-full max-md:w-full max-sm:w-full flex flex-col md:gap-5 md:my-4 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center">
        <div>
          <ArticleTagTitle />
          <ArticleFilterTagList />
        </div>
        <BlogList list={List} />
      </div>
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
