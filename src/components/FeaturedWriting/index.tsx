import Link from "next/link";

export const featuredWritings = [
  {
    focus: "운영/배포",
    title: "CI/CD 파이프라인 운영 흐름",
    href: "/blog/logs-cicd-pipeline",
    description:
      "코드 변경이 테스트, 빌드, 배포를 거쳐 서비스에 반영되는 과정을 운영 검증 관점에서 정리",
  },
  {
    focus: "장애 대응",
    title: "외부 서비스 장애 대응 전략",
    href: "/blog/logs-external-service-failure",
    description:
      "외부 API 장애가 전체 장애로 번지지 않도록 타임아웃, 재시도, fallback 기준 정리",
  },
  {
    focus: "성능/DB",
    title: "JPA N+1 쿼리 성능 개선",
    href: "/blog/logs-jpa-n-plus-one",
    description:
      "조회 코드가 실제 SQL과 성능 문제로 이어지는 흐름을 추적하고 최적화 기준을 정리",
  },
  {
    focus: "풀스택",
    title: "Spring Boot와 Next.js 캐시 전략",
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
    focus: "프론트 상태",
    title: "React Query 서버 상태 관리",
    href: "/blog/logs-react-query-server-state",
    description:
      "서버 상태를 화면 상태와 분리하고 캐시, 재요청, 동기화 흐름을 잡는 기준 정리",
  },
];

interface FeaturedWritingProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

const DEFAULT_DESCRIPTION =
  "서비스를 만들고 운영하면서 겪은 문제와 해결 과정을 기록했습니다.";

const FeaturedWriting = ({
  eyebrow = "기술 글",
  title = "최근에 정리한 글",
  description = DEFAULT_DESCRIPTION,
  className = "mx-auto w-full max-w-6xl",
}: FeaturedWritingProps) => {
  return (
    <section className={className}>
      <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
        {eyebrow}
      </p>
      <h2 className="py-1 text-3xl font-semibold md:text-4xl">
        {title}
      </h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
        {description}
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {featuredWritings.map((writing) => (
          <Link
            key={writing.href}
            href={writing.href}
            aria-label={`${writing.title} 글 보기`}
            className="transform-gpu rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-[border-color,box-shadow,color,transform] duration-200 ease-out hover:-translate-y-1 hover:border-teal-400 hover:text-teal-700 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-teal-500 dark:hover:text-teal-300 dark:focus-visible:ring-offset-slate-950"
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
