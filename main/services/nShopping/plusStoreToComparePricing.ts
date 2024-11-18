import { Page } from "playwright";
import wait from "waait";

export const plusStoreToComparePricing = async ({ page }: { page: Page }) => {
  try {
    const shoppingButton = page.locator(
      'a[data-shp-contents-dtl*="가격비교 검색결과 전환"]',
    );
    await shoppingButton.click();
    await page.waitForLoadState("networkidle");
    await wait(1500);
  } catch (e) {
    console.error(e.message);
    throw Error("plusStoreToComparePricing");
  }
  return { page };
};
