import { getArticleCategoryList } from "./api/notion";
import { ArticleCategory } from "./blog/components/ArticleCategory";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articleCategoryList = await getArticleCategoryList();
  return (
    <div className="items-start mx-auto p-8 flex gap-28 my-4 mb-20 md:gap-10 md:my-4 sm:gap-5 max-lg:items-center max-md:items-center max-sm:items-center">
      <div className="w-1/5 items-center max-lg:hidden max-md:hidden max-sm:hidden">
        <ArticleCategory list={articleCategoryList} />
      </div>
      {children}
    </div>
  );
}
