# 2026-06-02 포트폴리오 블로그와 프로젝트 작업 핸드오프

## 세 줄 요약

- `dev`를 기본 작업 브랜치로 정하고 `main`은 프로덕션 배포 브랜치로 유지합니다.
- 개인 프로젝트 섹션과 `castleCms` 카드가 추가되었고, 홈 화면은 `경력 / 개인 프로젝트` 탭 구조로 변경되었습니다.
- 블로그는 Notion 직접 의존을 줄이기 위해 `api/blog.ts` 진입점 뒤로 감쌌고, 이후 GitHub Markdown 글을 붙일 준비가 되었습니다.

## 현재 브랜치

`dev`

## 작업 목표

포트폴리오에 개인 프로젝트와 향후 토이프로젝트를 자연스럽게 추가할 수 있는 구조를 만들고, 블로그 데이터 출처를 Notion에서 GitHub Markdown까지 확장할 수 있도록 준비합니다.

## 작업 맥락

현재 포트폴리오는 Next.js App Router 기반으로 동작합니다. 기존에는 블로그가 Notion API를 직접 호출하는 구조였고, 프로젝트 섹션은 별도로 존재하지 않았습니다.

최근 작업으로 `castleCms` 개인 프로젝트를 추가했고, 홈 화면에서 경력과 개인 프로젝트를 탭으로 전환하도록 바꾸었습니다. 또한 블로그 화면에서 Notion API를 직접 import하지 않고 `src/app/(blogLayout)/api/blog.ts`를 통해 접근하도록 진입점을 분리했습니다.

## 주요 변경 파일

- `AGENTS.md`
- `src/app/page.tsx`
- `src/components/ProfileTabs/index.tsx`
- `src/components/Projects/data.json`
- `src/components/Projects/index.tsx`
- `src/app/(blogLayout)/api/blog.ts`
- `src/app/(blogLayout)/api/notion.ts`
- `docs/handoff/`
- `docs/retrospectives/`

## 검증 결과

이 핸드오프 구조를 추가하기 전 최근 작업에서 아래 명령을 확인했습니다.

```powershell
npm.cmd test
npm.cmd exec tsc -- --noEmit
npm.cmd run build
```

테스트는 통과하지만 파일 시스템 권한 상태에 따라 `coverage/coverage-final.json` 쓰기 경고가 출력될 수 있습니다. 이 경고는 테스트 실패와 별개로 발생할 수 있습니다.

## 남은 결정사항

GitHub에 작성하는 글을 어떤 방식으로 포트폴리오 블로그에 연결할지 결정해야 합니다.

후보는 다음과 같습니다.

- 로컬 `content/blog/*.md` 파일로 관리
- 별도 GitHub 저장소에서 Markdown을 가져오기
- GitHub issues 또는 discussions를 글 저장소처럼 활용

Vercel 배포 흐름도 계속 확인해야 합니다. 현재 운영 규칙은 `dev`에서 작업하고 검증한 뒤 사용자 승인 시 `main`으로 병합하는 방식입니다. `main`은 프로덕션 배포 브랜치로 간주합니다.

## 다음 단계

1. `api/blog.ts` 뒤쪽에 GitHub Markdown 글 로딩 기능을 추가합니다.
2. Notion 전용 구현은 `api/notion.ts` 안에 유지합니다.
3. Notion 글과 GitHub 글을 함께 다룰 수 있도록 source-aware post type을 설계합니다.
4. 기능 작업은 `dev`에서 feature 브랜치를 따서 진행합니다.
5. QA와 테스트가 끝난 뒤 `dev`에 병합하고, `dev`에서 최종 확인 후 사용자 승인 시 `main`으로 반영합니다.

## 참고 내용

현재 블로그 목록은 `BlogList`가 `AllArticle[]`를 받아 렌더링합니다. 이 구조 덕분에 목록 컴포넌트는 데이터가 Notion에서 왔는지 GitHub에서 왔는지 몰라도 됩니다.

상세 페이지는 아직 `pageId`를 Notion page id처럼 사용하는 전제가 남아 있습니다. GitHub Markdown을 붙일 때는 `slug`, `source`, `id`를 구분하는 타입 정리가 필요합니다.
