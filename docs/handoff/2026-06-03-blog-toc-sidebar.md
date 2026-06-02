# 2026-06-03 블로그 목차 사이드바 핸드오프

## 세 줄 요약

- 블로그 상세 글의 목차는 `##`, `###` 제목을 기준으로 자동 생성되며, 데스크톱에서는 글 상세 전체 레이아웃의 우측 컬럼에 표시됩니다.
- 이전 구현은 목차가 본문 영역 아래에서 시작해 스크롤 중 고정처럼 보였고, 최종 수정에서는 `PageContent` 내부가 아니라 글 상세 페이지 최상위 grid 우측으로 이동했습니다.
- 실제 배포 URL에서 Chrome Headless로 스크롤 QA를 수행했고, 스크롤 800px 시 목차도 800px 함께 이동하는 것을 수치로 확인했습니다.

## 현재 브랜치와 최신 커밋

현재 작업 기준 브랜치는 `dev`입니다.

최신 반영 커밋은 다음과 같습니다.

```text
05cdc59 블로그 목차를 글 상세 우측으로 이동
```

이 커밋은 `dev`와 `main`에 모두 푸시되어 있습니다. `main` 푸시 이후 Vercel 배포 HTML이 새 구조로 바뀐 것도 확인했습니다.

## 작업 목표

블로그 상세 글에서 목차를 본문 흐름을 방해하지 않는 위치에 배치하는 것이 목표였습니다. 사용자가 원하는 동작은 다음과 같습니다.

- 목차는 데스크톱에서 글 오른쪽 빈 공간에 있어야 합니다.
- 목차는 화면에 고정되어 따라오면 안 됩니다.
- 목차는 글 상세 레이아웃과 함께 자연스럽게 스크롤되어야 합니다.
- 모바일과 태블릿에서는 우측 공간이 부족하므로 본문 위 목차를 유지합니다.

## 최종 구현 구조

최종 구조에서는 `ArticleDetailPage`가 글 본문 데이터를 한 번 가져와서 본문과 우측 목차에 함께 전달합니다.

핵심 파일은 다음과 같습니다.

```text
src/app/(blogLayout)/blog/[pageId]/page.tsx
src/app/(blogLayout)/blog/[pageId]/components/PageContent/index.tsx
src/components/BlogDetail/index.tsx
src/components/BlogDetail/toc.ts
__tests__/blog-toc.test.ts
```

`src/app/(blogLayout)/blog/[pageId]/page.tsx`는 글 상세 전체를 grid로 구성합니다.

```text
grid-cols-1
xl:grid-cols-[minmax(0,56rem)_16rem]
```

왼쪽 컬럼에는 제목, 대표 이미지, 본문, 이전/다음 글 영역이 들어갑니다. 오른쪽 컬럼에는 `BlogTocSidebar`가 들어갑니다.

`src/components/BlogDetail/index.tsx`는 본문 렌더링과 모바일 목차를 담당합니다. 데스크톱 우측 목차는 `BlogTocSidebar`로 분리되어 글 상세 페이지 최상위 grid에서 렌더링됩니다.

## 목차 생성 규칙

목차는 `src/components/BlogDetail/toc.ts`에서 생성합니다.

- `##` 제목은 2단계 목차로 변환합니다.
- `###` 제목은 3단계 목차로 변환합니다.
- 코드블록 안의 heading 문법은 목차에서 제외합니다.
- 중복 제목은 `-1`, `-2` 형태로 slug를 분리합니다.
- 렌더링되는 `h2`, `h3` id와 목차 링크 id가 같은 slug 규칙을 사용합니다.

글 제목 영역의 페이지 타이틀은 목차 대상이 아닙니다. 본문 마크다운 안의 `##`, `###`만 목차 대상입니다.

## 스크롤 동작 QA

실제 배포 URL에서 Chrome Headless를 사용해 목차 위치를 측정했습니다.

대상 URL은 다음입니다.

```text
https://bocelog.vercel.app/blog/1ac5abe4-94ef-80c5-81cb-c236d3d60daa
```

최종 QA 결과는 다음과 같습니다.

```text
visibleCount: 1
width: 1904
scrollY: 800
position: static
beforeTop: 144
afterTop: -656
delta: -800
```

해석은 다음과 같습니다.

- 목차는 화면에 하나만 보입니다.
- 데스크톱 폭에서 우측 목차가 선택되었습니다.
- CSS position은 `static`입니다.
- 스크롤을 800px 내렸을 때 목차의 top 값도 정확히 800px 위로 이동했습니다.
- 따라서 `fixed`나 `sticky`로 고정된 상태가 아닙니다.

## 이전 문제 원인

처음에는 목차를 본문 상단에 넣었습니다. 이 방식은 이미지와 본문 사이에 큰 박스가 생겨 글 흐름을 끊었습니다.

두 번째로 목차를 `absolute left-full` 방식으로 본문 오른쪽에 띄웠습니다. 이 방식은 레이아웃 흐름에 포함되지 않아 고정된 요소처럼 보일 수 있었습니다.

세 번째로 `sticky`를 제거하고 grid를 적용했지만, 목차가 여전히 `PageContent` 내부에 있어서 대표 이미지 아래 본문 시작 지점에서 나타났습니다. 이 때문에 스크롤 중 화면 상단에 걸려 고정처럼 보였습니다.

최종 수정에서는 목차를 `PageContent` 밖으로 빼고, 글 상세 페이지 전체 grid의 우측 컬럼으로 이동했습니다. 이 구조에서는 목차가 제목과 대표 이미지 영역 옆에서 시작하므로 고정처럼 보이는 문제가 줄어듭니다.

## 검증 명령

최종 수정 전후로 아래 검증을 수행했습니다.

```powershell
npm.cmd exec tsc -- --noEmit
npm.cmd test -- --runInBand __tests__/blog-toc.test.ts
```

테스트는 통과했습니다. Jest 실행 시 `coverage/coverage-final.json` 쓰기에서 `EPERM` 경고가 나올 수 있습니다. 이 경고는 샌드박스 권한 문제이며 테스트 실패와는 별개입니다.

## 주의할 점

로컬 dev 서버에서 해당 Notion 상세 글을 열면 환경이나 데이터 문제로 `500`이 날 수 있습니다. 이 경우 로컬 화면 QA만으로 판단하지 말고, 배포 URL의 HTML 반영 여부와 브라우저 측정값을 함께 확인해야 합니다.

PowerShell `Invoke-WebRequest`와 `curl.exe`는 이 환경에서 TLS 인증서 문제로 Vercel HTTPS 요청이 실패할 수 있습니다. 같은 URL은 `node -e "fetch(...)"` 방식으로 확인할 수 있었습니다.

내장 브라우저 연결은 `windows sandbox failed: spawn setup refresh` 문제로 실패했습니다. 실제 화면 수치 QA는 Chrome Headless와 DevTools Protocol을 사용했습니다.

## 다음 작업자가 확인할 것

1. Vercel 배포 완료 후 실제 글 상세 페이지에서 우측 목차가 제목/대표 이미지 옆에서 시작하는지 확인합니다.
2. 스크롤 시 목차가 화면에 고정되어 남지 않고 글과 함께 사라지는지 확인합니다.
3. 모바일 폭에서는 본문 위 목차만 보이고 우측 목차는 숨겨지는지 확인합니다.
4. 사용자가 여전히 고정처럼 보인다고 하면 viewport 폭, 브라우저 zoom, 캐시 상태를 먼저 확인합니다.
5. 같은 문제가 반복되면 `BlogTocSidebar`의 위치보다 상위 레이아웃인 `src/app/(blogLayout)/layout.tsx`의 좌측 카테고리 영역과 gap 구조를 함께 점검합니다.
