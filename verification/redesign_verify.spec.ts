import { expect, test } from "@playwright/test";

test("verify introduction card redesign", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("svg");
  await page.screenshot({
    path: "verification/redesign_verify_v2.png",
    fullPage: true,
  });
});
