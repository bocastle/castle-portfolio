# GitHub Markdown 블로그와 QA 자동화 배포 회고

## 세 줄 요약

- Notion 중심이던 블로그 facade에 GitHub Markdown 글 소스를 붙여 두 출처의 글을 하나의 목록으로 다룰 수 있게 했다.
- Playwright 기반 브라우저 QA를 추가해 프로젝트 탭, 이미지 갤러리, 새 창 이미지, 블로그 TOC, 모바일/다크모드 캡처를 자동 검증했다.
- 로컬 Notion token이 없거나 invalid여도 블로그 상세가 500으로 터지지 않도록 fallback header/content/footer를 제공했다.

## 배포 내용

이번 작업은 남은 작업 후보 중 세 가지를 한 번에 마무리했다.

1. GitHub Markdown 블로그 연동
2. 브라우저 QA 자동화 강화
3. 로컬 Notion env fallback 개선

GitHub Markdown 글은 `public/markdown/blog/*.md`에 frontmatter와 본문을 두는 방식으로 연결했다. 파일명은 `github-` prefix가 붙은 pageId로 변환되고, `/blog/github-...` 경로에서 상세 페이지로 렌더링된다.

블로그 facade인 `src/app/(blogLayout)/api/blog.ts`는 이제 Notion 글과 GitHub Markdown 글을 병합한다. 목록, 카테고리, 태그는 두 출처를 합친 뒤 중복 이름을 제거하고, 상세 조회는 `github-` pageId이면 Markdown 소스로 바로 라우팅한다.

## 검증 결과

실행한 검증:

- `npm.cmd test -- --runInBand`
- `npm.cmd exec tsc -- --noEmit`
- `npm.cmd run build`
- build 이후 `npm.cmd exec tsc -- --noEmit`
- `npm.cmd run qa:browser`

확인 결과:

- Jest 전체 테스트 7 suites, 12 tests 통과
- TypeScript 타입체크 통과
- Next production build 통과
- Playwright 브라우저 QA 3 tests 통과
- 브라우저 QA에서 모바일 홈과 다크모드 홈 캡처 생성 확인

## 문제와 해결

Playwright QA는 처음에 `webServer`가 Windows에서 dev server를 종료한 뒤에도 명령이 반환되지 않는 문제가 있었다. 이를 해결하기 위해 `tools/browser-qa.cjs`를 추가해 Next dev server를 직접 띄우고, 테스트 종료 후 Windows에서는 `taskkill /T /F`로 프로세스 트리를 정리하도록 했다.

새 클론의 Node 22 환경에서는 `jest-environment-jsdom`이 끌고 온 `canvas@2.11.2` native binary가 없어 Jest가 실패했다. 하위 의존성에 이미 Node 22에서 동작하는 `canvas@3.1.0`이 있어 top-level devDependency를 `canvas@3.1.0`으로 맞춰 테스트 환경을 안정화했다.

## 배운 점

블로그 데이터 출처 확장은 UI보다 facade 경계가 중요했다. UI가 Notion을 직접 알지 않도록 정리해둔 덕분에 Markdown 소스를 붙이면서 페이지 컴포넌트 변경을 작게 유지할 수 있었다.

브라우저 QA는 단순 캡처보다 클릭 흐름 중심으로 구성했을 때 가치가 커졌다. 개인 프로젝트 탭, 이미지 갤러리, 새 창 링크, TOC 이동은 모두 사용자가 실제로 거치는 경로라서 회귀 검증 대상으로 적합했다.

## 다음 개선점

- GitHub Markdown 글을 별도 저장소에서 가져올지, 현재 repo 안 Markdown 파일로 유지할지 결정한다.
- Markdown frontmatter 검증 실패 시 누락 필드를 개발 로그에 더 명확하게 남긴다.
- 브라우저 QA 캡처 이미지를 회고 문서와 연결하는 방식을 정리한다.
- Vercel 배포 후 공개 URL 기준으로 GitHub Markdown 글 상세와 TOC를 한 번 더 확인한다.
