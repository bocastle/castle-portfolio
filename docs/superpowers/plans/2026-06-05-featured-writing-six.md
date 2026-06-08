# Featured Writing Six Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the home `FeaturedWriting` section from four links to six hiring-focused writing links.

**Architecture:** Keep the feature local to `FeaturedWriting`. Use static card metadata because the home section is curated, while the full blog list remains sourced through the existing blog facade.

**Tech Stack:** Next.js, React, Tailwind CSS, Jest, Testing Library.

---

### Task 1: Add Six Curated Writing Cards

**Files:**
- Modify: `src/components/FeaturedWriting/index.tsx`
- Test: `__tests__/featured-writing.test.jsx`

- [x] **Step 1: Write the failing component test**

```jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FeaturedWriting from "../src/components/FeaturedWriting";

describe("FeaturedWriting", () => {
  it("shows six hiring-focused writing links", () => {
    render(<FeaturedWriting />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(6);
    expect(screen.getByText("CI/CD 파이프라인 운영 흐름")).toBeInTheDocument();
    expect(screen.getByText("테스트하기 쉬운 코드의 조건")).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Update card metadata**

Use six fixed entries:

```text
CI/CD 파이프라인 운영 흐름
외부 서비스 장애 대응 전략
JPA N+1 쿼리 성능 개선
Spring Boot와 Next.js 캐시 전략
테스트하기 쉬운 코드의 조건
Codex로 포트폴리오 QA 자동화하기
```

- [x] **Step 3: Add evidence labels**

Add compact labels:

```text
운영/배포
장애 대응
성능/DB
풀스택
품질/테스트
AI QA
```

- [x] **Step 4: Update docs**

Document the home representative writing set in `docs/blog/logs-source-guide.md`.

- [x] **Step 5: Verify**

Run:

```powershell
npm.cmd test -- --runInBand
npm.cmd run build
npm.cmd exec tsc -- --noEmit
npm.cmd run qa:browser
```

## 2026-06-08 Update

상단 글 선별을 다시 보면서 `Codex로 포트폴리오 QA 자동화하기`는 전체 블로그 목록에 유지하고, 상단 6개에서는 `React Query 서버 상태 관리`로 교체했다. 최신 상단 묶음은 운영/배포, 장애 대응, 성능/DB, 프론트 상태, 풀스택, 품질/테스트 흐름이다.
