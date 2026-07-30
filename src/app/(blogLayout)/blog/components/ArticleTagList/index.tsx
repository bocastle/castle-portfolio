import { getArticleTagList, getPageList } from "@/app/(blogLayout)/api/blog";
import TagFilterBar from "@/components/ArticleTagList/TagFilterBar";

export const ArticleFilterTagList = async () => {
  const [articleTagList, articleList] = await Promise.all([
    getArticleTagList(),
    getPageList(),
  ]);

  // 글에 많이 붙은 태그부터 보여준다. 이름순이면 자주 쓰는 필터가 뒤로 밀린다.
  const useCountByTagName = new Map<string, number>();
  for (const article of articleList) {
    for (const tag of article.tagList) {
      useCountByTagName.set(
        tag.name,
        (useCountByTagName.get(tag.name) ?? 0) + 1
      );
    }
  }

  const sortedTagList = [...articleTagList].sort((left, right) => {
    const gap =
      (useCountByTagName.get(right.name) ?? 0) -
      (useCountByTagName.get(left.name) ?? 0);
    return gap !== 0 ? gap : left.name.localeCompare(right.name);
  });

  return <TagFilterBar tagList={sortedTagList} />;
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
