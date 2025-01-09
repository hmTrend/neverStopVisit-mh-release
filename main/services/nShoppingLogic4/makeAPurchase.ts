import { Page } from "playwright";
import wait from "waait";

export const makeAPurchase = async ({ page }: { page: Page }) => {
  try {
    const locators = [
      page.locator('a[data-shp-area="cat.more"]'),
      page.locator('a:has-text("상품 전체보기")'),
      page.locator('a:has-text("주의사항")'),
    ];
    const firstLocator = await Promise.race(
      locators.map((locator) =>
        locator.waitFor({ state: "visible" }).then(() => locator),
      ),
    );
    await Promise.all([
      firstLocator.click({ timeout: 5 * 1000 }),
      page.waitForLoadState("load"),
    ]);
    await wait(5 * 1000);
    return { page };
  } catch (e) {
    console.error(`makeAPurchase > ${e.message}`);
  }
};
