# 이직용 포트폴리오 메인 재구성 핸드오프

## 세 줄 요약

- 메인 화면을 "소개 + 경력 탭" 중심에서 "핵심 역량, 최근 경력 증거, 대표 프로젝트, 작업 로그, 글" 순서로 재구성했다.
- AI 협업 포트폴리오 개선 프로젝트를 진행형 대표 프로젝트로 추가했고, private 프로젝트도 면접에서 설명 가능한 구조로 정리했다.
- 사용자가 공개 승인한 이력서 PDF를 `public/resume/kim-bosung.pdf`에 배치하고 홈 CTA에서 열 수 있게 했다.

## 현재 브랜치

- 브랜치: `main`
- 원격: `origin/main`
- 기준 문서:
  - `docs/superpowers/specs/2026-06-05-career-portfolio-redesign-design.md`

## 작업 목표

이직 준비용 포트폴리오의 첫 화면에서 채용 담당자나 개발 리더가 바로 판단할 수 있도록 다음 정보를 우선 노출한다.

- 최근 실무 도메인: CRM, 결제, 정산, 관리자 포털
- 주력 구현 범위: API, 화면, SQL, 배포/운영 검증
- 대표 경력: Softwiz, LinkConnection, IlInch
- 대표 프로젝트: `castleCms`, AI 협업 기반 포트폴리오 개선
- 증거 자료: 공개 이력서 PDF, 블로그/작업 로그, 프로젝트 구조 설명 가능 여부

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
- `__tests__/information.test.jsx`
- `__tests__/projects.test.jsx`
- `e2e/portfolio-browser-qa.spec.ts`

## 검증 결과

현재까지 확인한 항목:

- `tsc --noEmit` 통과
- `next build` 통과
- `jest --runInBand` 통과
- 로컬 Next 서버에서 `/resume/kim-bosung.pdf` HTTP 200 확인
- `portfolio-browser-qa.spec.ts`, `work-history-tabs.spec.ts` Playwright E2E 통과

주의:

- `next build` 중 Webpack cache snapshot 경고가 출력될 수 있으나 production build는 성공한다.
- in-app Browser 제어용 `node_repl` 도구가 이 세션에 노출되지 않아 실제 화면 검증은 터미널 Playwright로 수행했다.

## 현재 로컬 주의사항

작업 트리에 기존 `package-lock.json` 변경이 남아 있다.

변경 내용:

- `fsevents` 항목의 `"dev": true` 한 줄 삭제

이 작업 범위와 무관하므로 커밋에 포함하지 않는다. 사용자가 의도한 install 결과인지 별도로 확인해야 한다.

## 다음 단계

1. 실제 배포 후 Vercel 화면에서 홈, PDF CTA, 프로젝트 섹션을 확인한다.
2. GA4에서 `Resume Click`, `Project Screenshot Select`, `Project Image Open` 이벤트가 들어오는지 확인한다.
3. `AI 협업 기반 포트폴리오 개선` 프로젝트에는 이후 커밋, QA 로그, 회고 글을 계속 누적한다.
4. private 프로젝트는 면접에서 말할 수 있는 범위의 구조 설명 자료를 별도 문서로 준비한다.
