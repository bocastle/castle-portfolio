"use client";

import { trackEvent } from "@/utils/analytics";

const focusKeywords = [
  "Go/Node.js/Java/Spring",
  "React/React Native/Next.js",
  "SQL 운영 데이터",
  "결제/정산/CRM",
  "CI/CD/운영 검증",
  "Codex/Cursor 워크플로우",
];

const proofPoints = [
  {
    label: "최근 업무 도메인",
    value: "CRM, 결제, 정산, 관리자 포털",
  },
  {
    label: "주력 범위",
    value: "웹/앱 화면, API, SQL, CI/CD/운영",
  },
  {
    label: "AI 협업 방식",
    value: "레거시 분석, 변경 영향 확인, 테스트/QA",
  },
];

const workHighlights = [
  {
    title: "CRM 고객 목록 조회 성능 최적화",
    metric: "1.6s -> 216ms",
    description:
      "EXPLAIN ANALYZE로 로그인/거래/계좌 이력 선계산 병목을 확인하고 페이지 대상 고객 선조회 구조로 개선했습니다.",
    href: "#work-history",
  },
  {
    title: "STICPAY E-Wallet 결제수단 도입",
    metric: "API/DB/포털 흐름 연결",
    description:
      "DB taxonomy, gateway, Client API, Client Portal, Office Portal 승인/상태조회 흐름을 함께 구현했습니다.",
    href: "#work-history",
  },
  {
    title: "운영형 CMS 설계",
    metric: "인증/권한/API Key 검증",
    description:
      "관리자 Bearer token, 외부 API Key, 조직/사용자 관리, 화면 QA까지 개인 프로젝트의 구현 기준으로 정리했습니다.",
    href: "#projects",
  },
];

const Information = () => {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-0 py-8 sm:px-2 lg:py-12">
      <div className="grid w-full items-start gap-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-10">
        <div className="grid min-w-0 gap-7 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[9rem_minmax(0,1fr)]">
          <div className="flex justify-center md:justify-end md:self-start md:pt-2">
            <div
              aria-label="김보성 프로필 마크"
              className="grid h-28 w-28 place-items-center rounded-lg border border-teal-300 bg-white shadow-sm dark:border-teal-700 dark:bg-slate-950 sm:h-32 sm:w-32 lg:h-36 lg:w-36"
            >
              <div className="text-center">
                <span className="block text-3xl font-semibold text-teal-700 dark:text-teal-300 sm:text-4xl">
                  KB
                </span>
                <span className="mt-1 block text-[0.65rem] font-semibold uppercase text-gray-500 dark:text-gray-300">
                  Full-stack
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full min-w-0 max-w-4xl flex-col gap-5 text-center md:text-left">
            <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
              웹/앱과 백엔드를 함께 다루는 풀스택 개발자
            </p>
            <h1 className="max-w-full break-keep py-0 text-[2rem] font-semibold leading-tight tracking-normal sm:text-4xl md:text-5xl">
              김보성,
              <br />
              서비스를 끝까지 다루는 풀스택 개발자입니다.
            </h1>
            <p className="w-full max-w-3xl break-keep text-base leading-7 text-gray-600 dark:text-gray-300 max-sm:text-[0.95rem]">
              React/React Native/Next.js 화면과 Go/Node.js/Java/Spring 기반 API,
              SQL 운영 데이터를 함께 다룹니다. 결제/정산/CRM/관리자 도구에서
              기능 설계, 배포, 운영 이슈 분석까지 이어지는 흐름을 경험했고,
              Codex/Cursor는 레거시 분석, 변경 영향 확인, 테스트/QA 속도를
              높이는 도구로 활용합니다.
            </p>
            <ul
              aria-label="핵심 기술과 업무 키워드"
              className="m-0 flex max-w-3xl list-none flex-row flex-wrap justify-center gap-2 p-0 text-sm text-gray-700 dark:text-gray-200 md:justify-start"
            >
              {focusKeywords.map((keyword) => (
                <li
                  key={keyword}
                  className="inline-flex min-h-9 items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 font-medium shadow-sm dark:border-slate-600 dark:bg-slate-800/80"
                >
                  {keyword}
                </li>
              ))}
            </ul>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href="/resume/kim-bosung.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("Resume Click", {
                    location: "home_profile",
                  })
                }
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-teal-500 bg-teal-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-700 dark:border-teal-400 dark:bg-teal-500 dark:text-slate-950 dark:hover:bg-teal-400"
              >
                <span aria-hidden="true">PDF</span>
                <span>이력서 보기</span>
              </a>
              <a
                href="mailto:bocastle1213@gmail.com"
                onClick={() =>
                  trackEvent("Contact Click", {
                    channel: "mail",
                    location: "home_profile",
                  })
                }
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-gray-300 bg-white px-4 text-sm font-semibold fill-black text-gray-800 transition-colors hover:border-green-500 hover:text-green-600 hover:fill-green-600 dark:border-slate-600 dark:bg-slate-800 dark:fill-white dark:text-gray-100 dark:hover:border-green-400 dark:hover:text-green-400 dark:hover:fill-green-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .02c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.99 6.98l-6.99 5.666-6.991-5.666h13.981zm.01 10h-14v-8.505l7 5.673 7-5.672v8.504z" />
                </svg>
                <p>Mail</p>
              </a>
              <a
                href="https://github.com/bocastle"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("Contact Click", {
                    channel: "github",
                    location: "home_profile",
                  })
                }
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-gray-300 bg-white px-4 text-sm font-semibold fill-black text-gray-800 transition-colors hover:border-green-500 hover:text-green-600 hover:fill-green-600 dark:border-slate-600 dark:bg-slate-800 dark:fill-white dark:text-gray-100 dark:hover:border-green-400 dark:hover:text-green-400 dark:hover:fill-green-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <p>GitHub</p>
              </a>
            </div>
          </div>
        </div>

        <aside className="w-full rounded-lg border border-gray-300 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900/80">
          <h2 className="py-0 text-lg font-semibold">채용 요약</h2>
          <dl className="mt-4 divide-y divide-gray-200 dark:divide-slate-700">
            {proofPoints.map((point) => (
              <div
                key={point.label}
                className="grid gap-1 py-3 first:pt-0 last:pb-0"
              >
                <dt className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">
                  {point.label}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-200">
                  {point.value}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section aria-label="최근 작업 하이라이트" className="grid gap-4">
        <div>
          <p className="m-0 text-sm font-semibold text-teal-700 dark:text-teal-300">
            성과 요약
          </p>
          <h2 className="py-1 text-2xl font-semibold md:text-3xl">
            최근 작업 하이라이트
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {workHighlights.map((point) => (
            <a
              key={point.title}
              href={point.href}
              aria-label={`${point.title} 자세히 보기`}
              onClick={() =>
                trackEvent("Work Highlight Click", {
                  title: point.title,
                  target: point.href,
                })
              }
              className="block min-w-0 transform-gpu rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-teal-400 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-900/70 dark:hover:border-teal-500 dark:focus-visible:ring-offset-slate-950"
            >
              <article className="grid gap-2">
                <span className="text-xs font-semibold uppercase text-teal-700 dark:text-teal-300">
                  {point.metric}
                </span>
                <h3 className="py-0 text-lg font-semibold">{point.title}</h3>
                <p className="m-0 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {point.description}
                </p>
              </article>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Information;
