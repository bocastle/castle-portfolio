import { expect, test } from "@playwright/test";

test("workHistory page shows the personal projects tab", async ({ page }) => {
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
