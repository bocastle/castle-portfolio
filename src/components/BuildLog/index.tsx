const buildLogs = [
  {
    title: "브라우저 QA 자동화",
    description:
      "홈, 프로젝트, 블로그, 모바일, 다크모드 흐름을 Playwright 기반 QA로 확인하도록 정리했습니다.",
  },
  {
    title: "GTM 이벤트 수집 단일화",
    description:
      "GA4 직접 태그와 GTM 병행으로 생길 수 있는 중복 집계 위험을 줄이고, 커스텀 이벤트를 dataLayer 단일 경로로 정리했습니다.",
  },
  {
    title: "기술 기록 자동화",
    description:
      "Dropbox Markdown 동기화와 GitHub Actions 스케줄 실행, Telegram 알림으로 개인 기술 기록 파이프라인을 자동화했습니다.",
  },
  {
    title: "글 목록 정리",
    description:
      "최근에 다시 정리한 글이 먼저 보이도록 블로그 목록 흐름을 다듬었습니다.",
  },
  {
    title: "castleCms 자료 정리",
    description:
      "private 프로젝트를 공개 가능한 구조 설명, API 예시, 권한 흐름, 검증 기준 중심으로 정리했습니다.",
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
