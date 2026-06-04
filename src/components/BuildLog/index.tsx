const buildLogs = [
  {
    title: "softwiz 로고 리소스 정리",
    description:
      "외부에 흩어진 로고 파일을 프로젝트 공개 이미지 경로로 옮기고 표시 비율을 조정했습니다.",
  },
  {
    title: "GA4 이벤트 추적 전환",
    description:
      "Vercel Analytics 유료 제한을 확인한 뒤 UTM/클릭 이벤트를 GA4/GTM 기반 구조로 전환했습니다.",
  },
  {
    title: "핸드오프 문서화",
    description:
      "작업 목표, 변경 파일, 검증 결과, 다음 단계를 문서로 남겨 다음 세션에서 이어받을 수 있게 정리했습니다.",
  },
  {
    title: "이직용 정보 구조 재설계",
    description:
      "AI 프로젝트를 전면에 세우지 않고 최신 경력과 대표 프로젝트를 먼저 보여주는 구조로 조정했습니다.",
  },
];

const BuildLog = () => {
  return (
    <section className="mx-auto w-full max-w-6xl">
      <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
        Build Log
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
