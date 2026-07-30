import Link from "next/link";

interface Props {
  /** 비어 있으면 전체 글 화면으로 본다. */
  categoryLabel?: string;
  postCount: number;
}

/**
 * 카테고리 화면의 머리말.
 *
 * 이 화면은 목록만 있고 제목이 없어서, 지금 무엇을 보고 있는지와
 * 어디로 돌아가는지가 드러나지 않았다. 그 둘을 명시한다.
 */
const CategoryHeader = ({ categoryLabel, postCount }: Props) => {
  const isAll = !categoryLabel;

  return (
    <header className="w-full border-b border-rule pb-6">
      <p className="m-0 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
        카테고리
      </p>
      <h1 className="mt-3 break-keep py-0 text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] sm:text-[2.25rem]">
        {isAll ? "전체 글" : categoryLabel}
      </h1>
      <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
        <span>글 {postCount}개</span>
        <Link
          href={isAll ? "/blog" : "/categories"}
          className="inline-flex min-h-[36px] items-center underline decoration-rule underline-offset-4 transition-colors hover:text-signal hover:decoration-signal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
        >
          {isAll ? "블로그 홈" : "전체 글"}
        </Link>
      </div>
    </header>
  );
};

export default CategoryHeader;
