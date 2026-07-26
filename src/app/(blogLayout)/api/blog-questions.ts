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
} as const;

export type BlogQuestionPageId = keyof typeof BLOG_QUESTIONS;

export const getBlogQuestion = (pageId: string): string | undefined =>
  BLOG_QUESTIONS[pageId as BlogQuestionPageId];
