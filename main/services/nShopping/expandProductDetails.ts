import { Page } from "playwright";
import wait from "waait";

export const expandProductDetails = async ({ page }: { page: Page }) => {
  try {
    await wait(1000);
    const pages = page.context().pages();
    page = pages[pages.length - 1]; // 가장 최근에 열린 탭
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("End");
    await wait(1000);
    await page.locator('button[data-shp-inventory="detailitm"]').click();
    await page.waitForLoadState("networkidle");
    return { page };
  } catch (e) {
    console.error(e.message);
  }
};
