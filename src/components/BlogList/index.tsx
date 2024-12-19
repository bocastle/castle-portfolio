import { blogList } from "@/app/(blogLayout)/api/types";
import Link from "next/link";

interface Props {
  list: blogList[];
}

const BlogList = ({ list }: Props) => {
  // console.log("BlogList::", list);
  return (
    <div>
      {list.map((item, index) => {
        const pageId = item.id;
        return (
          <Link href={`/blog/${pageId}`} key={item.id}>
            <div className="flex flex-col gap-24">{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
