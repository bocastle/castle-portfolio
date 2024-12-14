import { blogList } from "@/app/(blogLayout)/api/types";

interface Props {
  list: blogList[];
}

const BlogList = ({ list }: Props) => {
  // console.log("BlogList::", list);
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={item.id} className="flex flex-col gap-24">
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
