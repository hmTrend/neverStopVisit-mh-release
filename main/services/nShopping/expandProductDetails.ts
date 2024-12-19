import { Page } from "playwright";
import wait from "waait";

export const expandProductDetails = async ({ page }: { page: Page }) => {
  let newPage: Page;

  try {
    await wait(1000);
    const context = page.context();
    const allPages = context.pages();
    newPage = allPages[allPages.length - 1]; // 가장 최근에 열린 탭

    await newPage.keyboard.press("End");
    await wait(2000);
    await newPage.locator('button[data-shp-inventory="detailitm"]').click();
    await wait(3000);
    return { page: newPage };
  } catch (e) {
    console.error(`detailitm not found > ${e.message}`);
    return { page: newPage }; // 이제 newPage에 접근 가능
  }
};
