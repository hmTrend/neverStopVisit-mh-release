import { Page } from "playwright";
import wait from "waait";

export const makeAPurchase = async ({ page }: { page: Page }) => {
  try {
    const locators = [
      page.locator('a[data-shp-area="cat.more"]'),
      page.locator('a:has-text("상품 전체보기")'),
      page.locator('a:has-text("주의사항")'),
    ];

    console.log("oksk1");
    const firstLocator = await Promise.race(
      locators.map((locator) =>
        locator.waitFor({ state: "visible" }).then(() => locator),
      ),
    );
    console.log("oksk2");
    await firstLocator.click({ timeout: 2 * 1000 });
    console.log("oksk3");
    await page.waitForLoadState("load");
    console.log("oksk4");
    await wait(5 * 1000);
    return { page };
  } catch (e) {
    console.error(e.message);
  }
};
