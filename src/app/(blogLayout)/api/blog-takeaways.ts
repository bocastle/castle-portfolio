// 글마다 "이 글이 내리는 결론" 한 줄.
//
// 목록에서 제목 아래에 노출해, 훑기만 해도 각 글이 무엇을 답하는지 보이게 한다.
// 원문(bocastle/logs)의 정리·운영 체크리스트·실무 팁 절을 읽고 뽑았다.
// 새 글을 추가하면 여기에 한 줄을 더한다. 값이 없으면 목록은 결론 줄을 생략한다.
const BLOG_TAKEAWAYS = {
  // 백엔드
  "logs-jpa-n-plus-one":
    "글로벌 EAGER/LAZY로는 못 막는다. fetch join·@EntityGraph·배치 페치를 쿼리 단위로 고른다",
  "logs-cicd-pipeline":
    "좋은 파이프라인은 배포를 빠르게 하는 게 아니라 되돌아갈 기준을 남긴다",
  "logs-api-gateway":
    "횡단 관심사를 한곳에 모으되, 책임을 몰면 단일 장애점이 된다",
  "logs-cors": "막는 주체는 브라우저다. 서버는 허용 범위를 명시할 뿐",
  "logs-db-replication":
    "binlog → Relay Log → SQL 스레드. 복제 지연을 전제로 읽기를 배치한다",
  "logs-database-index":
    "정렬된 탐색 구조. 컬럼 순서와 카디널리티가 사용 여부를 가른다",
  "logs-spring-transaction-aop":
    "프록시가 경계를 만든다. 같은 클래스 내부 호출엔 안 걸린다",
  "logs-external-service-failure":
    "타임아웃·벌크헤드·서킷브레이커가 기본 축. 장애 주입으로 실제 동작을 확인한다",
  "logs-rate-limiting":
    "트래픽 절감이 아니라 시스템 보호와 공정한 사용량 보장이 목적",
  "logs-optimistic-pessimistic-lock":
    "충돌 빈도가 기준. 잦으면 비관적, 드물면 버전 기반 낙관적",

  // 프론트엔드
  "logs-react-query-server-state":
    "서버 상태와 클라이언트 상태를 분리하는 게 핵심",
  "logs-ssr-csr":
    "절대 우위는 없다. 초기 로딩·SEO·상호작용 성격으로 갈린다",
  "logs-browser-rendering":
    "DOM→CSSOM→Render Tree→Layout→Paint. reflow와 repaint에서 비용이 갈린다",
  "logs-react-error-boundary":
    "렌더링·라이프사이클 오류를 서브트리 단위로 격리한다",
  "logs-spring-next-cache":
    "계층별로 무엇을 캐시하는지 분리. 안 그러면 API와 화면이 따로 논다",
  "logs-nextjs-architecture":
    "파일 기반 라우팅과 렌더링 전략이 구조를 결정한다",
  "logs-web-accessibility":
    "‘착한 일’이 아니라 키보드·스크린리더·구조로 설명한다",

  // DevOps / 기타
  "logs-testable-code":
    "테스트가 많은 코드가 아니라, 변경했을 때 어디를 볼지 분명한 코드",
  "logs-zendesk-i18n-js":
    "CSP로 fetch가 막히면 JSON 대신 JS로 번역 리소스를 싣는다",
  "logs-async-mutex":
    "공유 자원 접근을 직렬화해 경쟁 상태를 막는다. release 보장이 관건",
  "logs-goroutine": "독립적으로 동시 실행되는 함수 단위",
  "github-fullstack-service-ops":
    "화면·API·데이터·배포를 하나의 흐름으로 본다",
  "github-codex-portfolio-qa":
    "변경 후 클릭 흐름과 배포 안정성을 반복 가능한 절차로 검증한다",
} as const;

export type BlogTakeawayPageId = keyof typeof BLOG_TAKEAWAYS;

export const getBlogTakeaway = (pageId: string): string | undefined =>
  BLOG_TAKEAWAYS[pageId as BlogTakeawayPageId];
