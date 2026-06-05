# Logs Article Tone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 상단 글 5개의 원본 Markdown을 면접 정리 노트 톤에서 개발 블로그 기록 톤으로 다듬는다.

**Architecture:** `castle-portfolio`는 `bocastle/logs`의 raw Markdown을 그대로 렌더링한다. 따라서 본문은 `C:\Users\D-\dev\go\src\testRepo\logs` 원본 레포에서 수정하고, 포트폴리오 레포에는 작업 기준과 검증 기록만 남긴다.

**Tech Stack:** Markdown, GitHub raw content, Next.js blog renderer, Jest, Playwright browser QA.

---

### Task 1: 원본 글 5개 톤 수정

**Files:**
- Modify: `C:\Users\D-\dev\go\src\testRepo\logs\백엔드 면접준비\ CICD 파이프라인 정리.md`
- Modify: `C:\Users\D-\dev\go\src\testRepo\logs\백엔드 면접준비\JPA N+1 문제.md`
- Modify: `C:\Users\D-\dev\go\src\testRepo\logs\백엔드 면접준비\외부 서비스 장애 대응 전략 정리.md`
- Modify: `C:\Users\D-\dev\go\src\testRepo\logs\프론트 면접준비\Spring Boot와 Next.js 캐시 정리.md`
- Modify: `C:\Users\D-\dev\go\src\testRepo\logs\DevOps\테스트하기 쉬운 코드의 조건.md`

- [x] 각 글의 첫 문단을 "정의" 중심에서 "왜 이 글을 정리했는지" 중심으로 바꾼다.
- [x] `정의`, `필수`, `종합 정리`, 이모지 heading처럼 교재식 표현을 줄인다.
- [x] 기술 설명, 코드 예시, 운영 체크리스트는 유지한다.
- [x] 기존 파일명과 포트폴리오 slug는 바꾸지 않는다.

### Task 2: 포트폴리오 문서 반영

**Files:**
- Modify: `C:\Users\D-\dev\go\src\testRepo\castle-portfolio\docs\blog\logs-quality-review.md`
- Modify: `C:\Users\D-\dev\go\src\testRepo\castle-portfolio\docs\blog\logs-source-guide.md`

- [x] 상단 5개 원본 글을 본문 톤까지 점검했다는 기록을 남긴다.
- [x] 포트폴리오 렌더링 구조는 유지한다는 점을 적는다.

### Task 3: 검증과 배포 확인

**Commands:**
- `npm.cmd test -- --runTestsByPath __tests__/github-logs-blog.test.ts __tests__/featured-writing.test.jsx --runInBand`
- `npm.cmd test -- --runInBand`
- `npm.cmd run build`
- `npm.cmd exec tsc -- --noEmit`
- `npm.cmd run qa:browser`

- [x] `logs` 레포에서 변경 파일이 5개인지 확인한다.
- [x] `logs` 레포를 커밋하고 `origin/main`에 푸시한다.
- [x] `castle-portfolio` 문서 변경을 커밋하고 `origin/dev`, `origin/main`에 푸시한다.
- [x] 공개 `/blog/logs-*` URL 중 최소 2개가 200으로 응답하는지 확인한다.
