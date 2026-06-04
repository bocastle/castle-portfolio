# 공개 QA, 포트폴리오 문구 싱크, GitHub Markdown 운영화 핸드오프

## 세 줄 요약

- 공개 Vercel URL 기준으로 홈, 블로그, `/workHistory` 탭 QA를 확인했고 로컬 QA에는 새 GitHub Markdown 글 상세 검증을 추가했다.
- 홈 첫 화면과 castleCms 설명을 채용 프로필 톤에 맞춰 풀스택, 운영, CI/CD, AI 개발 워크플로우가 바로 보이도록 정리했다.
- GitHub Markdown 글은 `slug` frontmatter를 지원하도록 확장했고, 실제 공개 글과 운영 가이드를 추가했다.

## 작업 범위

이번 작업은 세 가지를 함께 처리했다.

1. 공개 화면 QA
2. 포트폴리오 문구 싱크
3. GitHub Markdown 블로그 운영화

## 공개 화면 QA

배포된 공개 URL `https://bocelog.vercel.app` 기준으로 기존 Playwright QA를 실행했다.

확인한 항목:

- 홈 개인 프로젝트 탭 클릭
- castleCms 이미지 갤러리 클릭
- 큰 이미지 새 창 열림
- 기존 GitHub Markdown 블로그 TOC 이동
- 모바일 홈 캡처
- 다크모드 홈 캡처
- `/workHistory`의 개인 프로젝트 탭 전환

결과:

- `npm.cmd run qa:browser` with `QA_BASE_URL=https://bocelog.vercel.app`
- 4개 시나리오 통과

## 문구 싱크

홈 첫 화면은 채용 프로필에서 강조한 역량과 같은 톤으로 정리했다.

반영 방향:

- 웹/앱 프론트엔드와 백엔드 API를 함께 다루는 풀스택 방향
- SQL 기반 운영 데이터와 결제/정산/운영 시스템 경험
- 배포 흐름과 운영 이슈를 함께 보는 개발자
- Cursor/Codex는 구현 대체가 아니라 요구사항 분해, 레거시 분석, 테스트 검증 속도를 높이는 도구로 표현

추가된 키워드:

- React/React Native
- Go/Node.js
- Java/Spring
- SQL
- CI/CD와 운영
- Cursor/Codex

castleCms 설명은 운영형 CMS, 관리자 인증, API Key 기반 외부 연동, 권한 모델, 테스트 검증 중심으로 다시 정리했다.

## GitHub Markdown 운영화

`src/app/(blogLayout)/api/github-markdown.ts`에서 frontmatter `slug`를 지원한다.

URL 규칙:

- `slug: "fullstack-service-ops"`이면 `/blog/github-fullstack-service-ops`
- `slug`가 없으면 파일명을 기반으로 `/blog/github-<file-name>` 생성
- `slug`에 이미 `github-` prefix가 있으면 중복으로 붙이지 않음

추가된 실제 글:

- `public/markdown/blog/fullstack-service-ops.md`
- URL: `/blog/github-fullstack-service-ops`

추가된 운영 문서:

- `docs/blog/github-markdown-guide.md`

## 변경 파일

- `src/components/Information/index.tsx`
- `src/components/Projects/data.json`
- `src/app/(blogLayout)/api/github-markdown.ts`
- `src/app/(blogLayout)/api/types.ts`
- `public/markdown/blog/fullstack-service-ops.md`
- `docs/blog/github-markdown-guide.md`
- `__tests__/information.test.jsx`
- `__tests__/projects.test.jsx`
- `__tests__/github-markdown-blog.test.ts`
- `__tests__/blog-api.test.ts`
- `__tests__/fixtures/blog-markdown/service-ops-note.md`
- `e2e/github-markdown-blog.spec.ts`

## 검증 결과

로컬 검증:

- `npm.cmd test -- --runInBand` 통과
- `npm.cmd exec tsc -- --noEmit` 통과
- `npm.cmd run build` 통과
- `npm.cmd run qa:browser` 통과

브라우저 QA는 5개 시나리오를 확인했다.

- 새 GitHub Markdown 글 상세와 TOC
- 개인 프로젝트 탭, 이미지 갤러리, 원본 이미지 새 창
- 기존 블로그 TOC
- 모바일 홈과 다크모드 홈 캡처
- `/workHistory` 개인 프로젝트 탭

## 다음 확인

main 배포 후 공개 URL에서 아래를 확인하면 된다.

- `https://bocelog.vercel.app/blog/github-fullstack-service-ops`
- `https://bocelog.vercel.app/workHistory`
- `https://bocelog.vercel.app/`
