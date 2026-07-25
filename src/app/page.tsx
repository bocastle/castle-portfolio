import FeaturedWriting from "@/components/FeaturedWriting";
import Information from "@/components/Information";
import Projects from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgressbar";
import WorkHistory from "@/components/WorkHistory";
import { SHOW_PORTFOLIO } from "@/constants/feature-flags";
import { redirect } from "next/navigation";

export default function Home() {
  // 당분간 블로그만 운영 (2026-07-25): 홈 입구를 /blog로 통일한다.
  // 카테고리 사이드바가 있는 블로그 레이아웃으로 보내 로고 클릭 시 화면이
  // 바뀌지 않게 한다. SHOW_PORTFOLIO 복구 시 리다이렉트가 풀리고 홈이 살아난다.
  if (!SHOW_PORTFOLIO) {
    redirect("/blog");
  }

  return (
    <div>
      <ScrollProgress />
      <div className="mx-auto my-4 mb-20 flex w-full min-w-0 max-w-full flex-col items-center gap-14 px-6 py-8 sm:gap-16 sm:px-8 md:my-4 md:gap-20">
        <FeaturedWriting />
        <Information />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 md:gap-20">
          <WorkHistory />
          <Projects />
        </div>
      </div>
    </div>
  );
}
