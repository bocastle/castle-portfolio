# AGENTS.md

## 프로젝트

이 저장소는 김보성 개인 포트폴리오 사이트입니다.

- 프레임워크: Next.js App Router
- 언어: TypeScript, React
- 스타일: Tailwind CSS
- 배포: Vercel
- 기본 작업 브랜치: `dev`
- 프로덕션 브랜치: `main`

## 브랜치 운영 규칙

- 기본 작업은 항상 `dev`에서 시작합니다.
- 기능 개발은 `dev`에서 바로 진행하지 않고, `dev`에서 feature 브랜치를 따서 진행합니다.
- feature 브랜치 이름은 작업 내용을 알 수 있게 작성합니다.
  - 예: `feature/github-blog-source`
  - 예: `feature/project-card-polish`
- 기능 작업이 끝나면 QA와 테스트를 진행합니다.
- QA에서 문제가 발견되면 해당 feature 브랜치에서 수정하고 다시 QA를 진행합니다.
- 테스트와 QA에 문제가 없을 때만 feature 브랜치를 `dev`로 병합합니다.
- `dev`에서는 해당 기능이 `main`에 나가도 문제가 없는지 확인합니다.
  - 주요 화면이 정상 렌더링되는지 확인합니다.
  - 기능이 고장나지 않았는지 확인합니다.
  - 빌드가 깨지지 않는지 확인합니다.
- `dev` 검증이 끝난 뒤 사용자 승인 시 `main`으로 병합합니다.
- `main` 병합과 푸쉬가 끝나면 다시 `dev`로 돌아옵니다.
- `main`은 Vercel 프로덕션 배포 브랜치로 간주합니다.
- 사용자가 명시적으로 요청하지 않으면 `main`에 직접 커밋하거나 푸쉬하지 않습니다.

## 에이전트 작업 방식

- 서브에이전트를 사용할 수 있는 작업은 병렬로 나눠 진행합니다.
- 병렬 작업은 서로 파일 충돌이 적은 단위로 나눕니다.
- 병렬 작업 이후에는 통합 QA를 진행합니다.
- QA에서 발견된 문제는 해당 기능 브랜치에서 수정합니다.
- 수정 후 다시 QA를 진행합니다.
- 최종적으로 테스트와 QA가 통과한 뒤 병합합니다.

## 안전 규칙

- 사용자가 명시적으로 요청하지 않은 변경사항은 되돌리지 않습니다.
- 작업 전에는 반드시 상태를 확인합니다.

```powershell
git status --short --branch
```

- 파일 검색은 우선 `rg`를 사용합니다.
- 변경 범위는 요청한 작업에 맞게 제한합니다.
- 필요한 이유가 명확하지 않은 대규모 리팩터링은 하지 않습니다.
- 커밋 메시지는 사용자가 다르게 요청하지 않는 한 한글로 작성합니다.
- 커밋과 푸쉬는 사용자 승인 후 진행합니다.

## 문서 작성 규칙

- 문서는 한글로 작성합니다.
- 문서 확장자는 `.md`를 사용합니다.
- 문서 상단에는 반드시 `세 줄 요약` 섹션을 둡니다.
- `세 줄 요약`은 문서를 열자마자 작업의 핵심을 알 수 있게 작성합니다.
- 문서에서 다른 문서를 참조하라고만 쓰지 않습니다.
- 필요한 참고 내용은 문서 안에 요약해서 포함합니다.
- 누구나 단독으로 읽어도 맥락을 이해할 수 있게 작성합니다.
- 비밀값, 토큰, 계정 정보, 실제 인증 정보는 문서에 남기지 않습니다.

## 핸드오프 문서

긴 작업이나 여러 세션에 걸치는 작업은 `docs/handoff/`에 기록합니다.

- 하나의 주제 또는 작업 흐름마다 Markdown 파일 하나를 권장합니다.
- 파일명은 `YYYY-MM-DD-topic.md` 형식을 권장합니다.
- 현재 브랜치, 목표, 작업 맥락, 변경 파일, 검증 결과, 남은 결정사항, 다음 단계를 포함합니다.
- 작업이 완료되고 병합된 경우에도 삭제하지 않고 최종 상태를 짧게 남깁니다.

## 배포 회고 문서

배포 이후에는 `docs/retrospectives/`에 회고 문서를 작성합니다.

- 배포 단위마다 Markdown 파일 하나를 작성합니다.
- 파일명은 `YYYY-MM-DD-topic.md` 형식을 권장합니다.
- 상단에는 `세 줄 요약`을 둡니다.
- 배포 내용, 검증 결과, 문제 여부, 배운 점, 다음 개선점을 포함합니다.
- 회고 문서는 다음 배포자가 단독으로 읽어도 배포 맥락을 이해할 수 있게 작성합니다.

## 자주 쓰는 명령

PowerShell 환경에서는 `npm` 대신 `npm.cmd`를 사용합니다.

```powershell
npm.cmd test
npm.cmd exec tsc -- --noEmit
npm.cmd run build
```

참고:

- PowerShell 실행 정책 때문에 `npm`이 실패할 수 있습니다.
- 현재 `npm.cmd run lint`는 deprecated된 `next lint`를 사용하며 ESLint 설정 프롬프트가 열릴 수 있습니다.
- lint 스크립트를 정리하기 전까지는 `test`, `tsc`, `build`를 우선 검증 기준으로 사용합니다.
- Jest 테스트는 통과하더라도 `coverage/coverage-final.json` 쓰기 권한 경고가 출력될 수 있습니다.

## 포트폴리오 구조

홈 화면:

- `src/app/page.tsx`
- `src/components/Information`
- `src/components/ProfileTabs`
- `src/components/WorkHistory`
- `src/components/Projects`

경력:

- 데이터: `src/components/WorkHistory/data.json`
- 상세 마크다운: `public/markdown/workHistory/*.md`

개인 프로젝트:

- 데이터: `src/components/Projects/data.json`
- 컴포넌트: `src/components/Projects`
- 스크린샷: `public/images/projects/<project-name>/`

새 토이프로젝트를 추가할 때는 UI를 하드코딩하지 말고 데이터와 스크린샷을 추가하는 방식을 우선합니다.

## 블로그 구조

블로그 UI는 Notion을 직접 참조하지 않고 블로그 facade를 통해 데이터를 가져와야 합니다.

- 블로그 facade: `src/app/(blogLayout)/api/blog.ts`
- 현재 Notion 구현: `src/app/(blogLayout)/api/notion.ts`

규칙:

- 페이지와 컴포넌트는 블로그 함수를 `api/blog`에서 import합니다.
- Notion 전용 구현은 `api/notion.ts` 안에 유지합니다.
- GitHub Markdown 글을 추가할 때도 `api/blog.ts` 뒤쪽에서 확장하여 UI가 데이터 출처를 몰라도 되게 합니다.

중요 경로:

- 목록: `src/app/(blogLayout)/blog/page.tsx`
- 상세: `src/app/(blogLayout)/blog/[pageId]/page.tsx`
- 카테고리: `src/app/(blogLayout)/categories`

## 환경 변수와 빌드 안정성

- Notion, Cloudinary, GTM, GA 환경변수가 없어도 빌드는 깨지지 않아야 합니다.
- 선택적 외부 연동이 없으면 기능을 건너뛰거나 빈 상태로 안전하게 동작해야 합니다.
- `.env`, 로컬 미디어, 빌드 산출물, 생성된 인증 정보는 커밋하지 않습니다.

## 완료 보고 전 검증

작업 완료라고 말하기 전에 관련 범위에 맞게 아래를 실행합니다.

```powershell
npm.cmd test
npm.cmd exec tsc -- --noEmit
npm.cmd run build
git status --short --branch
```

실행하지 못한 명령이 있으면 이유를 함께 보고합니다.
