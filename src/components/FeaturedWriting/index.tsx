import Link from "next/link";

const writings = [
  {
    focus: "운영/배포",
    title: "CI/CD 파이프라인 정리",
    href: "/blog/logs-cicd-pipeline",
    description:
      "코드 변경이 테스트와 배포를 거쳐 서비스에 반영되는 흐름을 운영 관점에서 정리",
  },
  {
    focus: "장애 대응",
    title: "외부 서비스 장애 대응 전략 정리",
    href: "/blog/logs-external-service-failure",
    description:
      "외부 API 장애가 전체 장애로 번지지 않도록 타임아웃, 재시도, fallback 기준 정리",
  },
  {
    focus: "성능/DB",
    title: "JPA N+1 문제",
    href: "/blog/logs-jpa-n-plus-one",
    description:
      "조회 코드가 실제 SQL과 성능 문제로 이어지는 흐름을 추적하고 최적화 선택지를 정리",
  },
  {
    focus: "풀스택 연결",
    title: "Spring Boot와 Next.js 캐시 정리",
    href: "/blog/logs-spring-next-cache",
    description:
      "Spring Boot API와 Next.js 화면 사이에서 캐시 정책을 함께 맞춰야 하는 이유 정리",
  },
  {
    focus: "품질/테스트",
    title: "테스트하기 쉬운 코드의 조건",
    href: "/blog/logs-testable-code",
    description:
      "오래 검증 가능한 구조를 만들기 위한 의존성 분리와 테스트 기준 정리",
  },
  {
    focus: "AI QA",
    title: "Codex로 포트폴리오 QA 자동화하기",
    href: "/blog/github-codex-portfolio-qa",
    description:
      "포트폴리오 변경 후 클릭 흐름, 모바일 화면, 배포 안정성을 브라우저 QA로 검증한 기록",
  },
];

const FeaturedWriting = () => {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
        기술 글
      </p>
      <h2 className="py-1 text-3xl font-semibold md:text-4xl">
        대표 글
      </h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
        운영/배포, 장애 대응, 성능, 풀스택 연결, 품질 검증, AI 협업
        흐름을 보여주는 글을 먼저 배치했습니다.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {writings.map((writing) => (
          <Link
            key={writing.href}
            href={writing.href}
            aria-label={`${writing.title} 글 보기`}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-teal-400 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-teal-500 dark:hover:text-teal-300"
          >
            <article>
              <span className="mb-3 inline-flex rounded-md border border-teal-500/40 px-2 py-0.5 text-xs font-semibold text-teal-700 dark:text-teal-300">
                {writing.focus}
              </span>
              <h3 className="py-0 text-lg font-semibold">{writing.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {writing.description}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWriting;
