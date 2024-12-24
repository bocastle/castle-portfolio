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
