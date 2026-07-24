import { expect, test } from "@playwright/test";

test("GitHub logs JPA post renders with TOC", async ({ page }) => {
  await page.goto("/blog/logs-jpa-n-plus-one");

  await expect(
    page.getByRole("heading", {
      name: "JPA N+1 쿼리 성능 개선",
      level: 1,
    })
  ).toBeVisible();
  await expect(page.getByRole("navigation", { name: "글 목차" })).toBeVisible();

  await page.getByRole("link", { name: "1. N+1을 의심하는 순간" }).click();

  await expect
    .poll(() => decodeURIComponent(new URL(page.url()).hash))
    .toBe("#1-n1을-의심하는-순간");
});
