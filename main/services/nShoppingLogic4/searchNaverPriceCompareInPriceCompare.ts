import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export async function searchNaverPriceCompareInPriceCompare({
  page = undefined,
  nvMid = "83849891409",
  isTest = false,
}: {
  page?: Page;
  nvMid?: string;
  isTest?: boolean;
} = {}) {
  // 쇼핑탭 클릭으로 시작
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&ssc=tab.m.all&oquery=&tqi=iHeZplpzL80ssO%2FOlwossssstl4-515612&query=%EA%B0%80%EC%A0%95%EC%9A%A9%EC%A0%9C%EB%B9%99%EA%B8%B0+%EB%AF%B8%EB%8B%88",
        cookie: "",
      });
      page = test.page;
    }
    await clickShoppingTab({ page });
    for (let i = 0; i < 2; i++) {
      const pageO = await scrollWithNewItems({ page });
      try {
        await findProductByImageId({ page: pageO, nvMid });
        return { page };
      } catch (e) {
        console.error(e.message);
        if (i === 1) {
          throw new Error(`findProductByImageId > ${e.message}`);
        }
        await clickPageNumbers({ page, pageNumber: i + 2 });
      }
    }
  } catch (e) {
    console.error(e.message);
    throw Error(`searchNaverPriceCompare > ${e.message}`);
  }
  return { page };
}

async function clickShoppingTab({ page }) {
  try {
    const shopButton = page.locator('div.flick_bx a.tab:has-text("쇼핑")');
    await shopButton.click();
    await page.waitForLoadState("networkidle");
    await wait(1000);
  } catch (err) {
    console.error("Error clicking shopping tab:", err.message);
    throw err;
  }
}

async function findProductByImageId({
  page,
  nvMid,
}: {
  page: Page;
  nvMid: string;
}) {
  try {
    const productLink = page.locator(
      `a.product_btn_link__ArGCa[data-i="${nvMid}"]`,
    );
    if ((await productLink.count()) > 0) {
      await productLink.scrollIntoViewIfNeeded();
      await wait(1000);
      await productLink.click();
      await page.waitForLoadState("networkidle");
      await wait(1000);
      return;
    }
    throw new Error(`productLink > item not found`);
  } catch (e) {
    throw new Error(`findProductByImageId > ${e.message}`);
  }
}

async function scrollWithNewItems({ page }) {
  try {
    for (let i = 0; i < 4; i++) {
      const currentCount = await page
        .locator(".product_list_item__b84TO")
        .count();
      await page.keyboard.press("End");

      try {
        await page.waitForFunction(
          (count) => {
            return (
              document.querySelectorAll(".product_list_item__b84TO").length >
              count
            );
          },
          currentCount,
          { timeout: 10 * 1000 },
        );
      } catch (err) {
        console.error("No new items loaded after scrolling");
      }
    }
    await wait(1500);
    return page;
  } catch (err) {
    console.error("Error during scrolling:", err.message);
    throw err;
  }
}

async function clickPageNumbers({ page, pageNumber }) {
  const pageBtn = page.locator(`.paginator_inner__H_LDe a`).nth(pageNumber - 1);
  await pageBtn.click();
  await page.waitForLoadState("networkidle");
  await wait(1000);
}

// searchNaverPriceCompareInPriceCompare();
