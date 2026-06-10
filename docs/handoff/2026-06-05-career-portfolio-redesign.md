# 이직용 포트폴리오 메인 재구성 핸드오프

## 세 줄 요약

- 메인 화면을 "소개 + 경력 탭" 중심에서 "핵심 역량, 최근 경력 증거, 대표 프로젝트, 작업 로그, 글" 순서로 재구성했다.
- AI 협업 포트폴리오 개선 프로젝트를 진행형 대표 프로젝트로 추가했고, private 프로젝트도 면접에서 다룰 수 있는 구조로 정리했다.
- 사용자가 공개 승인한 이력서 PDF를 `public/resume/kim-bosung.pdf`에 배치하고 홈 CTA에서 열 수 있게 했다.

## 현재 브랜치

- 브랜치: `main`
- 원격: `origin/main`
- 원격 반영 완료 커밋:
  - `5c0bb1b Refine portfolio for career search`
  - `ca9b4b1 Update portfolio spec for resume PDF`
  - `be3c201 Add career portfolio redesign spec`
- 기준 문서:
  - `docs/superpowers/specs/2026-06-05-career-portfolio-redesign-design.md`

## 작업 목표

이직 준비용 포트폴리오의 첫 화면에서 채용 담당자나 개발 리더가 바로 판단할 수 있도록 다음 정보를 우선 노출한다.

- 최근 실무 도메인: CRM, 결제, 정산, 관리자 포털
- 주력 구현 범위: API, 화면, SQL, 배포/운영 검증
- 대표 경력: Softwiz, LinkConnection, IlInch
- 대표 프로젝트: `castleCms`, AI 협업 기반 포트폴리오 개선
- 증거 자료: 공개 이력서 PDF, 블로그/작업 로그, 프로젝트 구조 근거

## 변경 요약

- 홈에서 `Title`과 `ProfileTabs` 의존을 제거하고 정보 노출 순서를 고정했다.
- `Information` 컴포넌트를 히어로 + Hiring Snapshot + 이력서 CTA 형태로 재작성했다.
- `WorkHistory` 데이터에 `summary`, `domain`, `featured`, `techStack`, `topHighlights`를 추가했다.
- `ProjectItem`에 문제, 역할, 설계/구현, 검증/결과, AI 활용 구조를 추가했다.
- `AI 협업 기반 포트폴리오 개선` 프로젝트를 추가했다.
- `BuildLog`, `FeaturedWriting` 섹션을 추가해 작업 과정과 글 링크를 노출했다.
- 이력서 PDF를 `/resume/kim-bosung.pdf`로 공개 제공한다.

## 주요 변경 파일

- `src/app/page.tsx`
- `src/components/Information/index.tsx`
- `src/components/WorkHistory/index.tsx`
- `src/components/WorkHistory/components/WorkHistoryItem.tsx`
- `src/components/WorkHistory/data.json`
- `src/components/WorkHistory/typs.ts`
- `src/components/Projects/index.tsx`
- `src/components/Projects/components/ProjectItem.tsx`
- `src/components/Projects/data.json`
- `src/components/Projects/types.ts`
- `src/components/BuildLog/index.tsx`
- `src/components/FeaturedWriting/index.tsx`
- `public/resume/kim-bosung.pdf`
- `docs/interview/castlecms-private-project-brief.md`
- `__tests__/information.test.jsx`
- `__tests__/projects.test.jsx`
- `e2e/portfolio-browser-qa.spec.ts`

## 검증 결과

최종 확인한 항목:

- `git diff --check` 통과
- `node .\node_modules\typescript\bin\tsc --noEmit` 통과
- `node .\node_modules\jest\bin\jest.js --runInBand` 통과
- `node .\node_modules\next\dist\bin\next build` 통과
- 로컬 Next 서버에서 `/resume/kim-bosung.pdf` HTTP 200 확인
- `portfolio-browser-qa.spec.ts`, `work-history-tabs.spec.ts` Playwright E2E 통과

최종 Playwright 결과:

- `portfolio-browser-qa.spec.ts`: 3개 통과
- `work-history-tabs.spec.ts`: 1개 통과
- 총 4개 통과

최종 Jest 결과:

- 10 suites 통과
- 18 tests 통과
- 1 snapshot 통과

주의:

- `next build` 중 Webpack cache snapshot 경고가 출력될 수 있으나 production build는 성공한다.
- in-app Browser 제어용 `node_repl` 도구가 이 세션에 노출되지 않아 실제 화면 검증은 터미널 Playwright로 수행했다.
- 로컬 production 서버는 확인용으로 `http://127.0.0.1:3000/`에서 실행했다.

## 2026-06-10 이어받기 업데이트

- `docs/interview/castlecms-private-project-brief.md`를 추가해 private `castleCms` 프로젝트를 면접에서 설명할 수 있는 구조로 정리했다.
- `docs/interview/castlecms-api-brief.md`를 추가해 비밀값 없는 API 목록, 요청/응답 예시, 오류 응답 기준, 검증 포인트를 정리했다.
- 문서에는 문제 의식, Frontend/Backend 구조, 관리자 Bearer token 인증과 외부 API Key 인증 분리, Mermaid 권한 흐름, 검증 범위를 포함했다.
- `src/components/Projects/data.json`의 `castleCms` 설명을 면접 자료와 맞춰 운영형 CMS 설계/검증 사례로 더 짧게 다듬었다.
- 프로젝트 카드에 GitHub 문서 링크를 추가해 `castleCms`의 면접 설명 자료와 API 설명 자료를 공개 화면에서 열 수 있게 했다.
- `BuildLog`에 `castleCms 면접 자료화` 항목을 추가해 요구사항 정리, 문서화, 테스트, 배포 검증 흐름을 포트폴리오 개선 기록으로 누적했다.
- `__tests__/projects.test.jsx`는 새 카드 문구와 권한 분리 설명을 확인하도록 갱신했다.

현재 로컬 기준으로 `main`은 `origin/main`과 동기화된 상태에서 작업을 시작했다. 다음 개발자가 시작할 때는 아래를 먼저 확인한다.

```text
git status -sb
git pull origin main
```

## 2026-06-10 배포와 GA4 확인

커밋 `64ea8f5 Add castleCms API brief and project docs links` 푸시 후 확인한 내용:

- GitHub 문서 URL `docs/interview/castlecms-api-brief.md`는 HTTP 200으로 접근 가능하다.
- `https://bocelog.vercel.app/` 홈은 HTTP 200으로 접근 가능하다.
- 확인 시점의 공개 홈 HTML에는 `castleCms 면접 자료화`, `API 설명 자료`, `castlecms-api-brief.md`가 아직 포함되지 않았다. Vercel 배포 또는 prerender 반영 지연 가능성이 있으므로 잠시 뒤 다시 확인한다.
- GA4/GTM 대시보드는 인증이 필요한 영역이라 이 세션에서 직접 수집 여부를 확인하지 못했다.
- 코드 기준으로 `Project Documentation Open` 이벤트는 `trackEvent`를 통해 `project_documentation_open`으로 정규화되어 `window.gtag` 또는 `dataLayer`에 전달된다.

## 다음 단계

1. 실제 배포 후 Vercel 화면에서 홈, PDF CTA, 프로젝트 섹션을 확인한다.
2. GA4에서 `Resume Click`, `Project Screenshot Select`, `Project Image Open` 이벤트가 들어오는지 확인한다.
3. `AI 협업 기반 포트폴리오 개선` 프로젝트에는 이후 커밋, QA 로그, 회고 글을 계속 누적한다.
4. `Project Documentation Open` 이벤트가 GA4/GTM으로 들어오는지 확인한다.
