import { expect, test } from "@playwright/test";

test.describe("portfolio browser QA", () => {
  test("홈 최근 글 6개와 주요 라벨을 확인한다", async ({ page }) => {
    await page.goto("/");

    const featuredWritingLinks = [
      ["CI/CD 파이프라인 운영 흐름", "/blog/logs-cicd-pipeline"],
      ["외부 서비스 장애 대응 전략", "/blog/logs-external-service-failure"],
      ["JPA N+1 쿼리 성능 개선", "/blog/logs-jpa-n-plus-one"],
      ["Spring Boot와 Next.js 캐시 전략", "/blog/logs-spring-next-cache"],
      ["테스트하기 쉬운 코드의 조건", "/blog/logs-testable-code"],
      ["React Query 서버 상태 관리", "/blog/logs-react-query-server-state"],
    ];

    for (const [title, href] of featuredWritingLinks) {
      await expect(
        page.getByRole("link", { name: `${title} 글 보기` })
      ).toHaveAttribute("href", href);
    }

    await expect(
      page
        .getByRole("link", { name: "CI/CD 파이프라인 운영 흐름 글 보기" })
        .getByText("운영/배포", { exact: true })
    ).toBeVisible();
    await expect(
      page
        .getByRole("link", { name: "외부 서비스 장애 대응 전략 글 보기" })
        .getByText("장애 대응", { exact: true })
    ).toBeVisible();
    await expect(
      page
        .getByRole("link", { name: "Spring Boot와 Next.js 캐시 전략 글 보기" })
        .getByText("풀스택", { exact: true })
    ).toBeVisible();
    await expect(
      page
        .getByRole("link", { name: "테스트하기 쉬운 코드의 조건 글 보기" })
        .getByText("품질/테스트", { exact: true })
    ).toBeVisible();
    await expect(
      page
        .getByRole("link", { name: "React Query 서버 상태 관리 글 보기" })
        .getByText("프론트 상태", { exact: true })
    ).toBeVisible();
  });

  test("대표 프로젝트 노출, 이미지 갤러리, 원본 이미지 새 창을 확인한다", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "castleCms", exact: true })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "AI 협업 기반 포트폴리오 개선" })).toBeVisible();

    const projectArticle = page
      .locator("article")
      .filter({
        has: page.getByRole("heading", { name: "castleCms", exact: true }),
      })
      .first();
    const mainImageLink = projectArticle
      .locator('a[target="_blank"][href*="/images/projects/castlecms/"]')
      .first();
    const beforeHref = await mainImageLink.getAttribute("href");

    await projectArticle.locator('button[aria-pressed="false"]').first().click();

    await expect
      .poll(() => mainImageLink.getAttribute("href"))
      .not.toBe(beforeHref);

    const popupPromise = page.waitForEvent("popup");
    await mainImageLink.click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL(/\/images\/projects\/castlecms\//);
    await popup.close();
  });

  test("블로그 TOC 클릭 시 해당 heading으로 이동한다", async ({ page }) => {
    await page.goto("/blog/github-codex-portfolio-qa");

    await expect(page.getByRole("navigation", { name: "글 목차" })).toBeVisible();
    await page.getByRole("link", { name: "확인한 흐름" }).click();

    await expect
      .poll(() => page.evaluate(() => decodeURIComponent(window.location.hash)))
      .toBe("#확인한-흐름");
    await expect(page.locator('[id="확인한-흐름"]')).toBeVisible();
  });

  test("블로그 목록은 먼저 읽어볼 글 다음 전체 글을 보여준다", async ({ page }) => {
    await page.goto("/blog");

    await expect(page.getByRole("heading", { name: "먼저 읽어볼 글" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "CI/CD 파이프라인 운영 흐름 글 보기" })
    ).toHaveAttribute("href", "/blog/logs-cicd-pipeline");
    await expect(page.getByText("전체 글", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "글 목록" })).toBeVisible();
    await expect(page.getByText("배포", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("성능", { exact: true }).first()).toBeVisible();
  });

  test("모바일 홈과 다크모드 홈 화면을 캡처한다", async ({ browser }, testInfo) => {
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    await mobilePage.goto("/");
    await expect(mobilePage.locator("body")).toContainText("castle");
    await expect(
      mobilePage.getByRole("region", { name: "최근 작업" })
    ).toBeVisible();
    await expect(
      mobilePage.getByRole("link", {
        name: /CRM 고객 목록 조회 성능 최적화 자세히 보기/,
      })
    ).toHaveAttribute("href", "#work-history");
    await expect(
      mobilePage.locator("#work-history").getByText(/약 1\.6초에서 200ms대/)
    ).toBeVisible();
    await expect(
      mobilePage.locator("#projects").getByText("Dodge Arcade")
    ).toBeVisible();
    await expect
      .poll(() =>
        mobilePage.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        )
      )
      .toBeLessThanOrEqual(1);
    await mobilePage.screenshot({
      fullPage: true,
      path: testInfo.outputPath("home-mobile.png"),
    });
    await mobilePage.close();

    const darkPage = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    await darkPage.addInitScript(() => {
      window.localStorage.setItem("theme", "dark");
    });
    await darkPage.goto("/");
    await expect(darkPage.locator("html")).toHaveAttribute(
      "data-theme",
      "dark"
    );
    await darkPage.screenshot({
      fullPage: true,
      path: testInfo.outputPath("home-dark.png"),
    });
    await darkPage.close();
  });

  test("모바일 메뉴는 alert 없이 실제 링크 메뉴를 연다", async ({ browser }) => {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    const dialogs: string[] = [];
    page.on("dialog", async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.dismiss();
    });

    await page.goto("/");
    await page.getByRole("button", { name: "모바일 메뉴 열기" }).click();

    const mobileMenu = page.getByRole("navigation", { name: "모바일 메뉴" });
    await expect(mobileMenu).toBeVisible();
    await expect(
      page.getByRole("button", { name: "모바일 메뉴 닫기" })
    ).toHaveAttribute("aria-expanded", "true");
    await expect(mobileMenu.getByRole("link", { name: "Blog" })).toHaveAttribute(
      "href",
      "/blog"
    );
    await expect(
      mobileMenu.getByRole("link", { name: "WorkHistory" })
    ).toHaveAttribute("href", "/workHistory");
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        )
      )
      .toBeLessThanOrEqual(1);
    expect(dialogs).toEqual([]);

    await page.close();
  });

  test("모바일 블로그 목록과 상세는 제목과 이미지를 화면 폭 안에 맞춘다", async ({
    browser,
  }) => {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });

    await page.goto("/blog");
    await expect(page.getByRole("heading", { name: "글 목록" })).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        )
      )
      .toBeLessThanOrEqual(1);
    await expect(
      page
        .getByRole("link", { name: "CI/CD 파이프라인 운영 흐름 글 보기" })
        .first()
    ).toBeVisible();

    await page.goto("/blog/logs-cicd-pipeline");
    await expect(
      page.getByRole("heading", { name: "CI/CD 파이프라인 운영 흐름" })
    ).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        )
      )
      .toBeLessThanOrEqual(1);
    await expect(
      page.getByRole("img", { name: "CI/CD 파이프라인 운영 흐름" })
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "이전/다음 게시글" })
    ).toBeVisible();
    await expect(page.getByText(/다음\s*게시글/)).toBeVisible();

    await page.close();
  });
});
