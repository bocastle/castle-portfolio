import { getArticleTagList } from "@/app/(blogLayout)/api/notion";

export const ArticleFilterTagList = async () => {
  const articleTagList = await getArticleTagList();

  return (
    <div className="flex gap-4 relative py-3 px-3 items-start">
      {articleTagList.map((tag) => (
        <div
          key={tag.id}
          className="cursor-pointer text-[16px] leading-5 font-medium text-sky-600 dark:text-white bg-sky-400/10 rounded-full py-1 px-3 flex items-center  hover:bg-sky-400/20"
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};
