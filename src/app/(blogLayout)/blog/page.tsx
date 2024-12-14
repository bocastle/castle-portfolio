import BlogList from "@/components/BlogList";
import { getPageList } from "../api/notion";

export interface IBlogPagelist {
  cover: string;
  id: string;
  created_time: string;
}
export default async function BlogPage() {
  const List = await getPageList();
  // console.log("blog", List);

  return (
    <div className="items-center mx-auto p-8 flex flex-col gap-28 my-4 mb-20 md:gap-32 md:my-4 sm:gap-5">
      <BlogList list={List} />
    </div>
  );
}
