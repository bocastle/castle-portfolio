// 사이트 노출 범위 플래그.
//
// 당분간 블로그만 운영한다 (2026-07-25).
// - false: 홈에서 프로필/경력/프로젝트를 숨기고, /workHistory는 /blog로 리다이렉트.
// - true : 포트폴리오 전체 노출로 복구.
//
// 복구 절차:
//  1) 이 값을 true로 바꾼다.
//  2) 경력/프로젝트 이미지를 public/으로 되돌린다 (URL 서빙 위해 필요).
//     - content/images/projects      -> public/images/projects
//     - content/images/work-history  -> public/images/work-history
//     ※ 경력 마크다운(content/workHistory/)은 fs로 읽어 이동 불필요.
//  3) 아래 파일들의 관련 테스트 skip을 해제한다.
//     - __tests__/work-history-page.test.jsx
//     - __tests__/navbar.test.jsx
//     - e2e/work-history-tabs.spec.ts
//     - e2e/portfolio-browser-qa.spec.ts (대표 프로젝트 케이스)
export const SHOW_PORTFOLIO = false;
