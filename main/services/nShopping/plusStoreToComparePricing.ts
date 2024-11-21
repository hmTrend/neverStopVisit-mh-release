import { Page } from "playwright";
import wait from "waait";

export const plusStoreToComparePricing = async ({ page }: { page: Page }) => {
  try {
    try {
      const shoppingButton = page.locator(
        'a[data-shp-contents-dtl*="가격비교 검색결과 전환"]',
      );
      await shoppingButton.waitFor({ state: "visible" });
      await shoppingButton.click();
    } catch (e) {
      const elementLocator = page.locator(
        "/html/body/div/div[2]/div/div[1]/div/div[1]/div[2]/div/div[2]/ul/li[2]/div/a",
      );
      await elementLocator.waitFor({ state: "visible", timeout: 10000 });
      await elementLocator.click();
    }
    await page.waitForLoadState("load");
    await wait(1500);
  } catch (e) {
    console.error(e.message);
    throw Error("plusStoreToComparePricing");
  }
  return { page };
};
