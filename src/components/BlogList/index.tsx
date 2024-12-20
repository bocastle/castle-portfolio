import { AllArticle } from "@/app/(blogLayout)/api/types";
import Link from "next/link";

interface Props {
  list: AllArticle[];
}

const BlogList = ({ list }: Props) => {
  // console.log("BlogList::", list);
  return (
    <div>
      {list.map((item) => {
        return (
          <Link href={`/blog/${item.pageId}`} key={item.pageId}>
            <div className="flex flex-col gap-24">{item.title}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
