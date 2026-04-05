import { expect, test } from "@playwright/test";

test("verify enhanced hero and gallery", async ({ page }) => {
  await page.goto("http://localhost:3005");
  await page.waitForTimeout(2000); // Wait for images

  // Take screenshots for visual check
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.screenshot({ path: "hero_desktop_v2.png" });

  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: "hero_mobile_v2.png" });
});
