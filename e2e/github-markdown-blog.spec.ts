import { expect, test } from "@playwright/test";

test("GitHub Markdown operations post renders with TOC", async ({ page }) => {
  await page.goto("/blog/github-fullstack-service-ops");

  await expect(
    page.getByRole("heading", {
      name: "풀스택 개발자로 서비스 운영 흐름 다루기",
      level: 1,
    })
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "글 목차" })).toBeVisible();

  await page.getByRole("link", { name: "개인 프로젝트와 연결한 방식" }).click();

  await expect
    .poll(() => page.evaluate(() => decodeURIComponent(window.location.hash)))
    .toBe("#개인-프로젝트와-연결한-방식");
});
