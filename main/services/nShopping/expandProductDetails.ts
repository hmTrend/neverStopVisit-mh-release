import { Page } from "playwright";
import wait from "waait";
import { errorRetryBoundery } from "../commons/errorRetry";

export const expandProductDetails = async ({ page }: { page: Page }) => {
  try {
    await wait(1000);
    const pages = page.context().pages();
    page = pages[pages.length - 1]; // 가장 최근에 열린 탭
    await page.keyboard.press("End");
    await wait(2000);
    await page.locator('button[data-shp-inventory="detailitm"]').click();
    await wait(3000);
    return { page };
  } catch (e) {
    console.error(`detailitm not found > ${e.message}`);
    return { page };
  }
};
