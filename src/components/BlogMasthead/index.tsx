import Link from "next/link";

interface Props {
  /** 공개된 글 수. 목록 데이터에서 넘겨받는다. */
  postCount: number;
}

/**
 * 블로그 목록 최상단의 정체 선언.
 * 홈(/)이 /blog로 리다이렉트되므로 이 화면이 사실상 대문이다.
 */
const BlogMasthead = ({ postCount }: Props) => {
  return (
    <header className="w-full border-b border-rule pb-10">
      <p className="m-0 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        castle.log
      </p>
      <h1 className="mt-5 max-w-3xl break-keep py-0 text-[2rem] font-semibold leading-[1.25] tracking-[-0.02em] sm:text-[2.75rem]">
        {/*
          "글마다 결론 한 줄"이라고 쓰면 결론이 없는 글에서 약속이 깨진다.
          목록이 실제로 보여주는 것(질문과 결론)만 말한다.
        */}
        운영에서 막혔던 질문과{" "}
        {/* 좁은 화면에서는 자연스럽게 흐르도록 강제 줄바꿈을 숨긴다. */}
        <br className="hidden sm:inline" />
        그때 내린 결론을 정리합니다.
      </h1>
      <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
        <span>글 {postCount}개</span>
        {/* 사이드바를 걷어낸 뒤 카테고리로 들어가는 유일한 입구다. */}
        <Link
          href="/categories"
          className="underline decoration-rule underline-offset-4 transition-colors hover:text-signal"
        >
          카테고리 전체
        </Link>
      </div>
    </header>
  );
};

export default BlogMasthead;
