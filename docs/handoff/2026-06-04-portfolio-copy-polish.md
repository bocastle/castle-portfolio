# 포트폴리오 문구 개선 및 최종 QA 핸드오프

## 세 줄 요약

- 첫 화면 문구를 “꿈” 중심 표현에서 풀스택 역할과 운영 경험이 바로 보이는 표현으로 정리했다.
- castleCms 개인 프로젝트 설명을 요구사항 정의, 구조 설계, 인증/권한, 테스트 검증 중심으로 강화했다.
- 블로그 API 진입점을 `api/blog.ts` facade로 명시해 이후 GitHub Markdown 소스를 추가하기 쉬운 구조로 정리했다.

## 작업 배경

포트폴리오를 채용담당자 관점에서 점검하면서 데스크톱 화면은 비교적 안정적이었지만, 첫 화면 문구가 추상적으로 보이고 개인 프로젝트 설명이 “AI가 만들어준 프로젝트”처럼 오해될 수 있는 여지가 있었다. 또한 블로그 글을 Notion뿐 아니라 GitHub Markdown에서도 가져오고 싶다는 방향이 있어, UI가 데이터 출처를 직접 알지 않도록 블로그 API 경계를 정리할 필요가 있었다.

## 변경 파일

- `src/components/Information/index.tsx`
  - 프로필 이미지 alt를 실제 의미에 맞게 수정했다.
  - H1을 “서비스를 끝까지 다루는 풀스택 개발자 김보성”으로 정리했다.
  - 소개 문장을 웹/앱, 백엔드, 배포/운영, AI 개발 도구 활용 흐름이 보이도록 수정했다.

- `src/components/Projects/data.json`
  - castleCms 프로젝트 유형을 “운영형 관리자 도구” 중심으로 수정했다.
  - 요약과 설명을 요구사항 정의, API 계약, 인증/권한, 데이터 모델, 테스트 기준 중심으로 강화했다.
  - 주요 포인트를 운영형 CMS 기능 범위, 인증 구조, 콘텐츠 운영, 조직/권한, 외부 API Key, AI 활용 검증 흐름으로 정리했다.

- `src/app/(blogLayout)/api/blog.ts`
  - 단순 re-export 구조에서 활성 블로그 소스를 감싸는 facade 구조로 변경했다.
  - 현재는 Notion 소스를 사용하지만, 이후 GitHub Markdown 소스를 붙일 때 UI 페이지를 크게 건드리지 않고 확장할 수 있다.

- `__tests__/projects.test.jsx`
  - castleCms 프로젝트 설명 변경에 맞춰 테스트 기대 문구를 갱신했다.

## 검증 기준

이번 작업은 다음 기준으로 검증한다.

- `npm.cmd test -- --runInBand` 통과
- `npm.cmd exec tsc -- --noEmit` 통과
- `npm.cmd run build` 통과
- production server 기준 홈/개인 프로젝트/블로그 상세 화면 캡처 확인
- 배포 후 `https://bocelog.vercel.app/`와 블로그 상세 URL에서 최신 문구와 TOC 렌더링 확인

## 남은 확인 사항

로컬 개발 환경의 Notion API token이 유효하지 않으면 블로그 상세가 500으로 보일 수 있다. Vercel 배포 환경에서는 Notion env가 설정되어 있어 공개 URL 기준으로 확인해야 한다. GitHub Markdown 글 연동은 아직 구현하지 않았고, 이번 작업은 그 전 단계인 facade 정리에 해당한다.
