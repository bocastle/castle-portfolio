import { expect, test } from "@playwright/test";

// 당분간 블로그만 운영 (2026-07-25). /workHistory는 /blog로 리다이렉트된다.
// SHOW_PORTFOLIO 복구 시 skip을 해제한다.
test.skip("workHistory page shows the personal projects tab", async ({ page }) => {
  await page.goto("/workHistory");

  await expect(page.locator("#workHistory-tab")).toHaveAttribute(
    "aria-selected",
    "true"
  );

  await page.locator("#projects-tab").click();

  await expect(page.locator("#projects-tab")).toHaveAttribute(
    "aria-selected",
    "true"
  );
  await expect(page.locator("#projects-panel")).toContainText("castleCms");
});
