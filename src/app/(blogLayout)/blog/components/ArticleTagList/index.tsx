import { getArticleTagList } from "@/app/(blogLayout)/api/notion";

export const ArticleFilterTagList = async () => {
  const articleTagList = await getArticleTagList();

  return (
    <div className="flex gap-4">
      {articleTagList.map((tag) => (
        <div key={tag.id}>{tag.name}</div>
      ))}
    </div>
  );
};
