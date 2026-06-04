import { expect, test } from "@playwright/test";

test.describe("portfolio browser QA", () => {
  test("개인 프로젝트 탭, 이미지 갤러리, 원본 이미지 새 창을 확인한다", async ({
    page,
  }) => {
    await page.goto("/");

    await page.locator("#projects-tab").click();
    await expect(page.locator("#projects-panel")).toContainText("castleCms");

    const mainImageLink = page
      .locator('#projects-panel a[target="_blank"]')
      .first();
    const beforeHref = await mainImageLink.getAttribute("href");

    await page.locator('#projects-panel button[aria-pressed="false"]').first().click();

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

  test("모바일 홈과 다크모드 홈 화면을 캡처한다", async ({ browser }, testInfo) => {
    const mobilePage = await browser.newPage({
      viewport: { width: 390, height: 844 },
    });
    await mobilePage.goto("/");
    await expect(mobilePage.locator("body")).toContainText("castle");
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
});
