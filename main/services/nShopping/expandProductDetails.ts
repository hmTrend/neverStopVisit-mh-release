import { Page } from "playwright";
import wait from "waait";

export const expandProductDetails = async ({ page }: { page: Page }) => {
  let newPage: Page;
  for (let i = 0; i < 4; i++) {
    try {
      await wait(1000);
      const context = page.context();
      const allPages = context.pages();
      newPage = allPages[allPages.length - 1]; // 가장 최근에 열린 탭
      const button = newPage.locator('button[data-shp-inventory="detailitm"]');
      await button.scrollIntoViewIfNeeded();
      await wait(1000);
      await button.click({ timeout: 3 * 1000 });
      await wait(2000);
      return { page: newPage };
    } catch (e) {
      console.error(`detailitm not found > ${e.message}`);
      if (i === 3) {
        return { page: newPage };
      }
    }
  }
};
