const CATEGORY_LABELS: Record<string, string> = {
  Backend: "백엔드",
  Frontend: "프론트엔드",
  DevOps: "운영/배포",
  JavaScript: "JavaScript",
  Go: "Go",
};

const TAG_LABELS: Record<string, string> = {
  Accessibility: "접근성",
  API: "API",
  Architecture: "구조",
  Browser: "브라우저",
  Cache: "캐시",
  Concurrency: "동시성",
  Consistency: "정합성",
  Database: "DB",
  Deployment: "배포",
  "Error Boundary": "오류 복구",
  Frontend: "프론트엔드",
  Gateway: "게이트웨이",
  Operations: "운영",
  Performance: "성능",
  Quality: "품질",
  Reliability: "안정성",
  Rendering: "렌더링",
  Resilience: "장애 대응",
  State: "상태 관리",
  Testing: "테스트",
  Transaction: "트랜잭션",
};

export const getBlogCategoryLabel = (name: string) =>
  CATEGORY_LABELS[name] ?? name;

export const getBlogTagLabel = (name: string) => TAG_LABELS[name] ?? name;
