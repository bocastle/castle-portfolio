import { AllArticle } from "@/app/(blogLayout)/api/types";
import { getDistanceFromToday, getYearMonthDay } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";

interface Props {
  list: AllArticle[];
}

const BlogList = ({ list }: Props) => {
  // console.log("BlogList::", list);
  return (
    <div className="grid grid-cols-2 gap-6">
      {list.map((item) => {
        return (
          <Link
            href={`/blog/${item.pageId}`}
            key={item.pageId}
            className="flex flex-col items-start gap-5"
          >
            <div className="w-[476px] h-[270px] relative">
              <Image
                unoptimized
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
            <div className="gap-4">
              <div className="flex flex-col gap-24 items-start text-[24px] text-white dark:text-white">
                {item.title}
              </div>
              <div className="flex flex-col gap-24 items-start text-[14px] text-indigo-300 dark:text-indigo-300">
                {getYearMonthDay(item.createdAt)}&nbsp;&nbsp;
                {getDistanceFromToday(item.createdAt)}
              </div>
              <div className="flex gap-3 pt-2 items-start">
                {item.tagList.map((tag) => (
                  <div
                    key={tag.id}
                    className="cursor-pointer text-[16px] leading-5 font-medium text-sky-600 dark:text-white bg-sky-400/10 rounded-full py-1 px-3 flex items-center  hover:bg-sky-400/20"
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
