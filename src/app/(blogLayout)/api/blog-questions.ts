// 글마다 "이 글이 답하는 질문".
//
// 이 블로그는 면접·실무 레퍼런스다. 독자의 실제 용무는 주제를 훑는 게 아니라
// 지금 막힌 것을 답해주는 글을 찾는 것이라, 목록에서는 질문을 앞에 세운다.
// 질문이 없는 글은 제목이 그대로 앞에 온다.
const BLOG_QUESTIONS = {
  // 백엔드
  "logs-jpa-n-plus-one": "N+1은 언제 의심하고, 무엇부터 고치나",
  "logs-cicd-pipeline": "파이프라인 단계를 왜 나누나",
  "logs-api-gateway": "게이트웨이에 어디까지 맡겨도 되나",
  "logs-cors": "CORS는 누가 막는 건가",
  "logs-db-replication": "복제는 어떻게 전달되고, 지연은 어디서 생기나",
  "logs-database-index": "인덱스를 어떻게 만들어야 실제로 타나",
  "logs-spring-transaction-aop": "@Transactional이 왜 안 걸릴 때가 있나",
  "logs-external-service-failure": "외부 API 장애를 어디서 끊나",
  "logs-rate-limiting": "요청을 제한하는 진짜 이유는 뭔가",
  "logs-optimistic-pessimistic-lock": "낙관적 락과 비관적 락, 무엇으로 고르나",

  // 프론트엔드
  "logs-react-query-server-state": "서버 상태를 왜 따로 다루나",
  "logs-ssr-csr": "SSR과 CSR은 무엇을 보고 고르나",
  "logs-browser-rendering": "화면이 그려지기까지 무슨 일이 일어나나",
  "logs-react-error-boundary": "렌더링 중 터진 오류를 어디서 잡나",
  "logs-spring-next-cache": "캐시를 비웠는데 화면이 그대로인 이유는",
  "logs-nextjs-architecture": "Next.js는 무엇으로 구조가 정해지나",
  "logs-web-accessibility": "접근성을 어떻게 구체적으로 말하나",

  // DevOps / 기타
  "logs-testable-code": "테스트를 붙이기 쉬운 코드는 무엇이 다른가",
  "logs-zendesk-i18n-js": "CSP로 fetch가 막히면 번역을 어떻게 싣나",
  "logs-async-mutex": "비동기에서 경쟁 상태를 어떻게 막나",
  "logs-goroutine": "Go는 동시 실행을 어떤 단위로 다루나",
  "github-fullstack-service-ops": "화면부터 배포까지 하나로 어떻게 다루나",
  "github-codex-portfolio-qa": "변경 후 QA를 어떻게 반복 가능하게 만드나",

  // Notion 글. 회고·문제 모음처럼 질문 하나로 요약되지 않는 글은 제목을 그대로 둔다.
  "1765abe4-94ef-8041-b60c-cbda9f251b31":
    "함수와 함수 호출은 무엇이 다른가",
  "1765abe4-94ef-80b7-b1af-f25ff39a3b50":
    "자바스크립트는 함수 호출을 어떻게 처리하나",
  "1805abe4-94ef-8088-a93f-e87389c97fbc": "유사 배열을 배열로 어떻게 바꾸나",
  "1815abe4-94ef-80e7-a19f-ef7aa12ca5e6": "Next.js에 테스트를 어떻게 붙이나",
  "1985abe4-94ef-8049-9dba-f304a6b14d9f": "다크모드에서 깜빡임이 왜 생기나",
  "1ac5abe4-94ef-80c5-81cb-c236d3d60daa":
    "git 계정 설정을 어떻게 확인하고 바꾸나",
  "1815abe4-94ef-8047-b85c-d9fb97129717": "서드파티 스크립트를 어떻게 넣나",
  "1965abe4-94ef-80da-86a8-cd236f0e31c9":
    "Expo에서 네이티브 폴더를 어떻게 만드나",
} as const;

export type BlogQuestionPageId = keyof typeof BLOG_QUESTIONS;

export const getBlogQuestion = (pageId: string): string | undefined =>
  BLOG_QUESTIONS[pageId as BlogQuestionPageId];
