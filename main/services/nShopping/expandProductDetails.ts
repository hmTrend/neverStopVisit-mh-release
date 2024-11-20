import { Page } from "playwright";
import wait from "waait";

export const expandProductDetails = async ({ page }: { page: Page }) => {
  try {
    console.log(1);
    await wait(1000);
    const pages = page.context().pages();
    console.log(2);
    page = pages[pages.length - 1]; // 가장 최근에 열린 탭
    await page.waitForLoadState("networkidle");
    console.log(3);
    await page.keyboard.press("End");
    await wait(1000);
    console.log(4);
    await page.locator('button[data-shp-inventory="detailitm"]').click();
    console.log(5);
    await page.waitForLoadState("networkidle");
    console.log(6);
    return { page };
  } catch (e) {
    console.error(e.message);
  }
};
