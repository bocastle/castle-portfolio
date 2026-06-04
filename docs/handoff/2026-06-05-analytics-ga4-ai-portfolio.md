# Analytics, GA4 전환, AI 협업 포트폴리오 방향 핸드오프

## 세 줄 요약

- Vercel Web Analytics의 UTM/Custom Events 기능이 유료 제한에 걸려 세부 추적은 GA4/GTM 이벤트로 보내도록 전환했다.
- 포트폴리오에는 연락, 내비게이션, 탭, 블로그, 프로젝트 이미지 상호작용 이벤트를 심었고 배포 커밋까지 완료했다.
- 앞으로는 "AI-assisted Portfolio Rebuild"를 진행형 대표 프로젝트로 삼아 요구사항 정리, UI 개선, 리소스 관리, 분석/배포 검증 과정을 포트폴리오 증거로 축적한다.

## 현재 브랜치

- 브랜치: `main`
- 원격: `origin/main`
- 최신 관련 커밋:
  - `73a1e1c Route custom analytics events to GA4`
  - `be1f5f5 Add portfolio analytics events`
  - `4be440e 경력 로고 표시 비율 수정`
  - `7088025 홈 소개 디자인과 소프트위즈 로고 정리`

## 작업 배경

공개 Vercel Analytics 화면에서 방문자와 페이지뷰는 확인됐지만, 사용자가 UTM 탭에 접근했을 때 "Upgrade to Web Analytics Plus" 메시지가 표시됐다. Vercel 공식 가격 정책상 Hobby에서는 UTM Parameters와 Custom Events 기반 상세 분석을 무료로 보기 어렵다.

따라서 Vercel Analytics는 기본 방문자/페이지뷰 용도로 유지하고, 세부 행동 추적은 이미 프로젝트에 연결돼 있던 Google Analytics 4 또는 Google Tag Manager 쪽으로 보내는 구조로 바꿨다.

## 변경된 분석 구조

현재 구조:

- Vercel Analytics
  - 기본 방문자 수
  - 페이지뷰
  - 대략적인 유입/기기 정보

- GA4/GTM
  - UTM 캠페인 방문
  - 메일/GitHub 클릭
  - 내비게이션 클릭
  - 경력/개인 프로젝트 탭 클릭
  - 블로그 글 클릭
  - 블로그 카테고리 클릭
  - 블로그 태그 필터 클릭
  - 프로젝트 스크린샷 선택
  - 프로젝트 원본 이미지 열기

## 이벤트 이름

코드에서는 사람이 읽기 쉬운 이름을 쓰고, GA4로 보낼 때는 소문자 snake_case로 정규화한다.

예시:

- `Campaign Visit` -> `campaign_visit`
- `Contact Click` -> `contact_click`
- `Nav Click` -> `nav_click`
- `Profile Tab Click` -> `profile_tab_click`
- `Blog Article Click` -> `blog_article_click`
- `Blog Category Click` -> `blog_category_click`
- `Blog Tag Toggle` -> `blog_tag_toggle`
- `Project Image Open` -> `project_image_open`
- `Project Screenshot Select` -> `project_screenshot_select`

## 주요 변경 파일

- `src/utils/analytics.ts`
  - 기존 Vercel `track()` 호출을 제거했다.
  - `window.gtag("event", ...)`가 있으면 GA4 이벤트로 보낸다.
  - `window.gtag`가 없고 `dataLayer`가 있으면 GTM 이벤트로 push한다.
  - 이벤트명과 파라미터 키를 GA4에 맞게 정규화한다.

- `src/components/Analytics/CampaignTracker.tsx`
  - 첫 방문 URL의 `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`을 읽는다.
  - 같은 세션에서 같은 캠페인 이벤트가 중복 전송되지 않도록 `sessionStorage`로 dedupe한다.

- `src/app/layout.tsx`
  - 기존 `<Analytics />`는 유지했다.
  - `<CampaignTracker />`를 추가해 UTM 방문을 추적한다.
  - `GTM_ID`, `GTAG_ID` 환경변수가 있으면 Google 태그를 삽입한다.

- `src/components/Information/index.tsx`
  - Mail/GitHub 클릭 이벤트를 추가했다.

- `src/components/Navbar/index.tsx`
  - 브랜드 링크와 메뉴 링크 클릭 이벤트를 추가했다.
  - 모바일 메뉴 버튼 클릭도 이벤트로 남긴다.

- `src/components/ProfileTabs/index.tsx`
  - 경력/개인 프로젝트 탭 클릭 이벤트를 추가했다.

- `src/components/BlogList/index.tsx`
  - 블로그 글 클릭 이벤트를 추가했다.

- `src/app/(blogLayout)/components/ArticleCategory/index.tsx`
  - 카테고리 클릭 이벤트를 추가했다.

- `src/components/ArticleTagList/index.tsx`
  - 태그 필터 토글 이벤트를 추가했다.

- `src/components/Projects/components/ProjectItem.tsx`
  - 프로젝트 스크린샷 선택과 원본 이미지 열기 이벤트를 추가했다.

## 검증 결과

검증한 명령:

- `git diff --check` 통과
- `tsc --noEmit` 통과
- `next build` 통과

빌드 중 Webpack cache snapshot 경고가 출력됐지만 production build 자체는 성공했다.

## 배포 및 환경변수

GA4 이벤트를 보려면 Vercel 환경변수에 아래 값이 필요하다.

```text
GTAG_ID=G-...
```

GTM으로 관리하려면 아래 값도 사용할 수 있다.

```text
GTM_ID=GTM-...
```

비밀값은 문서에 기록하지 않는다.

테스트용 URL 예시:

```text
https://bocelog.vercel.app?utm_source=test&utm_medium=codex&utm_campaign=portfolio_test
```

배포 후 GA4 Realtime 또는 Events 화면에서 `campaign_visit`, `contact_click`, `profile_tab_click` 같은 이벤트가 보이면 정상이다.

## 현재 로컬 주의사항

작업 트리에 `package-lock.json` 변경이 남아 있다.

변경 내용:

- `fsevents` 항목의 `"dev": true` 한 줄 삭제

이 변경은 analytics 작업 중 만든 것이 아니므로 커밋에 포함하지 않았다. 다음 작업자가 의도된 변경인지 확인한 뒤 처리해야 한다.

## 이직용 포트폴리오 방향

사용자는 기존 성과 자료를 미리 준비해둔 상태가 아니며, 앞으로 AI와 함께 진행하는 프로젝트를 포트폴리오에 추가하려는 상황이다.

따라서 "성과를 이미 가진 프로젝트"처럼 과장하지 않고, 현재 포트폴리오 개선 과정 자체를 프로젝트 증거로 축적하는 방향이 적합하다.

대표 프로젝트 후보:

```text
AI-assisted Portfolio Rebuild
AI 협업 기반 개발자 포트폴리오 개선 프로젝트
```

핵심 메시지:

```text
AI 개발 도구를 활용해 요구사항 정리, UI 개선, 이미지 리소스 관리,
방문 분석 이벤트 설계, 배포 검증까지 반복적으로 개선한 포트폴리오 리빌드 프로젝트
```

포트폴리오에 남길 증거:

- 기존 데스크탑 화면의 정보 구조 문제 발견
- softwiz 로고 리소스 정리와 표시 비율 개선
- Vercel 배포와 공개 화면 확인
- Vercel Analytics 유료 제한 확인
- GA4/GTM 기반 이벤트 추적 구조로 전환
- 커밋 단위의 작업 이력
- AI와 요구사항, 설계, 검증을 반복한 과정

## 다음 단계

1. 메인 화면을 이직 목적에 맞게 재구성한다.
2. 첫 화면에 타겟 포지션, 핵심 스택, 연락 CTA를 명확히 노출한다.
3. `AI-assisted Portfolio Rebuild`를 진행형 대표 프로젝트로 추가한다.
4. 프로젝트 카드에는 "문제, 역할, AI 활용, 기술, 결과" 구조를 적용한다.
5. GA4에 데이터가 쌓이면 실제 클릭/유입 수치를 프로젝트 성과로 일부 반영한다.

