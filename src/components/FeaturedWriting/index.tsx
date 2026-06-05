import Link from "next/link";

const writings = [
  {
    title: "풀스택 개발자로 서비스 운영 흐름 다루기",
    href: "/blog/github-fullstack-service-ops",
    description:
      "웹/앱, 백엔드 API, 데이터, 배포와 운영 이슈를 하나의 서비스 흐름으로 연결한 경험 정리",
  },
  {
    title: "Codex로 포트폴리오 QA 자동화하기",
    href: "/blog/github-codex-portfolio-qa",
    description:
      "포트폴리오 변경 후 클릭 흐름, 모바일 화면, 배포 안정성을 브라우저 QA로 검증한 기록",
  },
  {
    title: "JPA N+1 문제",
    href: "/blog/logs-jpa-n-plus-one",
    description:
      "조회 코드가 실제 SQL과 성능 문제로 이어지는 흐름을 추적하고 최적화 선택지를 정리",
  },
  {
    title: "외부 서비스 장애 대응 전략 정리",
    href: "/blog/logs-external-service-failure",
    description:
      "외부 API 장애가 전체 장애로 번지지 않도록 타임아웃, 재시도, fallback 기준 정리",
  },
];

const FeaturedWriting = () => {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
        Technical Writing
      </p>
      <h2 className="py-1 text-3xl font-semibold md:text-4xl">
        대표 글
      </h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
        이직 포트폴리오에서 실무 판단의 근거가 되는 운영, 성능, 검증
        기록을 먼저 배치했습니다.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {writings.map((writing) => (
          <Link
            key={writing.href}
            href={writing.href}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-teal-400 hover:text-teal-700 dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-teal-500 dark:hover:text-teal-300"
          >
            <article>
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
