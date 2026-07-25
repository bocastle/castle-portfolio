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
        운영에서 부딪힌 주제를 정리하고,{" "}
        {/* 좁은 화면에서는 자연스럽게 흐르도록 강제 줄바꿈을 숨긴다. */}
        <br className="hidden sm:inline" />
        글마다 결론 한 줄을 남깁니다.
      </h1>
      <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
        <span>백엔드 · 프론트엔드 · DevOps</span>
        <span>글 {postCount}개</span>
      </div>
    </header>
  );
};

export default BlogMasthead;
