import { Page } from "playwright";

export const googleToNaver = async ({ page }: { page: Page }) => {
  await page.locator("textarea.gLFyf").click();
  await page.locator("textarea.gLFyf").fill("네이버");
  await Promise.all([
    page.waitForLoadState("networkidle"),
    page.keyboard.press("Enter"),
  ]);
  await Promise.all([
    page.waitForLoadState("networkidle"),
    page.locator('a[href="https://www.naver.com/"]').click(),
  ]);
  return { page };
};
