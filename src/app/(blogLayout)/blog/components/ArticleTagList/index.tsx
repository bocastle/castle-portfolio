import { getArticleTagList } from "@/app/(blogLayout)/api/notion";
import ArticleTagList from "@/components/ArticleTagList";

export const ArticleFilterTagList = async () => {
  const articleTagList = await getArticleTagList();

  return (
    <div className="flex flex-wrap gap-4 relative py-3 px-3 items-start max-md:flex-wrap">
      {articleTagList.map((tag) => (
        <ArticleTagList key={tag.id} articleTagInfo={tag} />
      ))}
    </div>
  );
};
// // 이 함수는 Server Side에서 빌드 타임에 호출된다.
// // Client Side에서는 호출되지 않으므로 직접 데이터베이스 쿼리를 수행할 수도 있다.
// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const articleTagList = await getArticleTagList();
  return articleTagList;
}
