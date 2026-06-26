import BlogList from "@/components/BlogList";
import FeaturedWriting from "@/components/FeaturedWriting";
import BlogAdSenseSlot from "@/components/GoogleAds/BlogAdSenseSlot";
import { getPageList } from "../api/blog";
import { ArticleFilterTagList } from "./components/ArticleTagList";
import { ArticleTagTitle } from "./components/ArticleTagTitle";

export interface IBlogPagelist {
  cover: string;
  id: string;
  created_time: string;
}
export default async function BlogPage() {
  const List = await getPageList();

  return (
    <div className="w-3/5 items-start max-lg:w-full max-md:w-full max-sm:w-full flex flex-col gap-10 md:my-4 max-lg:items-center max-md:items-center max-sm:items-center">
      <FeaturedWriting
        eyebrow="기술 글"
        title="먼저 읽어볼 글"
        description="서비스 운영 중 마주친 배포, 장애 대응, 성능, 캐시, 테스트 이야기를 정리했습니다."
        className="w-full"
      />
      <div className="w-full">
        <ArticleTagTitle />
        <ArticleFilterTagList />
      </div>
      <BlogAdSenseSlot className="my-2" />
      <BlogList list={List} />
    </div>
  );
}

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
  const List = await getPageList();
  return List;
}
