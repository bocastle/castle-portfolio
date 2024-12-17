import { getArticleTagList } from "@/app/(blogLayout)/api/notion";

export const ArticleFilterTagList = async () => {
  const articleTagList = await getArticleTagList();

  return (
    <div className="flex gap-3 relative rounded-xl border py-3 px-3 items-center">
      {articleTagList.map((tag) => (
        <div
          key={tag.id}
          className="cursor-pointer text-xs leading-5 font-medium text-sky-600 dark:text-sky-400 bg-sky-400/10 rounded-full py-1 px-3 flex items-center  hover:bg-sky-400/20"
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};
