import { AllArticle } from "@/app/(blogLayout)/api/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  list: AllArticle[];
}

const BlogList = ({ list }: Props) => {
  // console.log("BlogList::", list);
  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {list.map((item) => {
        return (
          <Link
            href={`/blog/${item.pageId}`}
            key={item.pageId}
            className="flex flex-col items-center"
          >
            <div className="w-80 h-52 relative">
              <Image
                loading="lazy"
                src={item.thumbnailUrl}
                alt="thumbnail"
                objectFit="cover"
                placeholder="blur"
                className="rounded-lg hover:rounded-lg hover:border-[1.5px] hover:border-gray-400 after:hover:border-solid after:hover:transition-opacity after:hover:opacity-100 after:hover:duration-700 after:hover:ease-in-out"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==" // 추가
                fill
              />
            </div>
            <div className="flex flex-col gap-24 items-center">
              {item.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
