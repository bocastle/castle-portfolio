const buildLogs = [
  {
    title: "브라우저 QA 자동화",
    description:
      "홈, 프로젝트, 블로그, 모바일, 다크모드 흐름을 Playwright 기반 QA로 확인하도록 정리했습니다.",
  },
  {
    title: "GA4 이벤트 추적 전환",
    description:
      "방문 경로와 주요 CTA 클릭 흐름을 확인할 수 있도록 UTM과 GA4/GTM 이벤트 추적을 정리했습니다.",
  },
  {
    title: "블로그 추천 글 정리",
    description:
      "운영/배포, 장애 대응, 성능, 풀스택, 품질 검증 글을 먼저 볼 수 있게 목록 구조를 정리했습니다.",
  },
  {
    title: "배포 검증 흐름 정리",
    description:
      "테스트, 빌드, 타입체크, 브라우저 QA, Vercel 반영 확인을 반복 가능한 절차로 정리했습니다.",
  },
];

const BuildLog = () => {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
        개선 기록
      </p>
      <h2 className="py-1 text-3xl font-semibold md:text-4xl">
        포트폴리오 개선 기록
      </h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
        포트폴리오 자체를 제품처럼 다루며 요구사항, 리소스, 분석, 배포,
        문서화를 커밋 단위로 개선하고 있습니다.
      </p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {buildLogs.map((log) => (
          <article
            key={log.title}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
          >
            <h3 className="py-0 text-lg font-semibold">{log.title}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {log.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BuildLog;
