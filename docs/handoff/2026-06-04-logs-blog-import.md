## 세 줄 요약

- `bocastle/logs` 저장소의 대표 Markdown 글 21개를 포트폴리오 블로그 소스로 연결했다.
- 목록은 로컬 메타데이터로 렌더링하고, 상세 본문은 GitHub raw Markdown을 fetch해서 보여준다.
- 카테고리별 기본 썸네일 5개와 단위/E2E 테스트를 추가했다.

# 2026-06-04 logs 블로그 연동 핸드오프

## 작업 브랜치

```text
feature/logs-blog-import
```

## 목표

`bocastle/logs`에 이미 작성된 글을 포트폴리오 블로그에 선별 공개한다.

원본 저장소의 Markdown에는 frontmatter가 없기 때문에, 포트폴리오에서 필요한 title, description, slug, category, tags, thumbnail 정보를 별도로 관리한다.

## 구현 내용

새 소스 모듈:

```text
src/app/(blogLayout)/api/github-logs.ts
```

facade 연결:

```text
src/app/(blogLayout)/api/blog.ts
```

테스트:

```text
__tests__/github-logs-blog.test.ts
e2e/github-logs-blog.spec.ts
```

문서:

```text
docs/blog/logs-source-guide.md
docs/handoff/2026-06-04-logs-blog-import.md
```

썸네일:

```text
public/images/blog/logs/backend.svg
public/images/blog/logs/frontend.svg
public/images/blog/logs/devops.svg
public/images/blog/logs/javascript.svg
public/images/blog/logs/go.svg
```

## 공개 글

대표글 21개를 공개 대상으로 넣었다.

- Backend 10개
- Frontend 7개
- DevOps 2개
- JavaScript 1개
- Go 1개

대표 URL:

```text
/blog/logs-jpa-n-plus-one
```

## 동작 방식

블로그 목록과 카테고리는 로컬 메타데이터만 사용한다.

상세 페이지에 들어가면 아래 원본에서 raw Markdown을 가져온다.

```text
https://raw.githubusercontent.com/bocastle/logs/main/<path>
```

본문의 첫 번째 `#` 제목은 상세 상단 H1과 중복되지 않도록 제거한다.

## 환경 변수

테스트나 임시 비활성화가 필요하면 아래 값을 사용한다.

```text
GITHUB_LOGS_BLOG_ENABLED=false
```

기본값은 활성화다.

## 남은 작업

- 대표글 개별 썸네일을 더 정교하게 만들기
- 글별 요약 문구를 실제 지원 포지션 문장과 더 맞추기
- 중복 주제 글을 정리해서 2차 공개 후보를 만들기
- raw GitHub fetch 실패 시 상세 페이지 fallback UI를 추가할지 결정하기
