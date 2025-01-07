import { Page } from "playwright";
import wait from "waait";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";

export const searchNVMID = async ({
  page = undefined,
  nvMid = "",
  isTest = true,
  plusStoreId = "5613965202",
}: {
  page?: Page;
  nvMid?: string;
  isTest?: boolean;
  plusStoreId?: string;
} = {}) => {
  if (isTest) {
    const test = new PuppeteerEngine();
    await test.initialize({
      url: "https://search.shopping.naver.com/ns/search?query=%EC%88%98%EB%B6%84%ED%81%AC%EB%A6%BC",
      cookie: "",
    });
    page = test.page;
  }
  try {
    await wait(1000);
    const button = page.locator('button:has(span.blind:text-is("2단"))');
    await button.waitFor({ state: "visible" });
    await button.click();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 5; j++) {
        const { isFindNvMid } = await findProducts({ page, plusStoreId });
        if (isFindNvMid) {
          return { page, isFindNvMid: true };
        }
        await Promise.all([
          page.waitForLoadState("load"),
          page.keyboard.press("End"),
        ]);
        await wait(1000);
      }
      await nextNumberClick({ page });
    }
  } catch (e) {
    console.error(e.message);
    throw Error("search-products");
  }
  return { page, isFindNvMid: false };
};

async function findProducts({ page, plusStoreId }) {
  try {
    await wait(1000);
    const elements = await page
      .locator(
        `a[aria-labelledby="basic_product_card_information_${plusStoreId}"]`,
      )
      .filter({
        hasNot: page.locator('span.blind:text-is("광고")'),
      })
      .count();
    if (elements > 0) {
      const productLocator = page.locator(
        `a[aria-labelledby="basic_product_card_information_${plusStoreId}"]`,
      );
      await productLocator.scrollIntoViewIfNeeded();
      await wait(1500);
      await Promise.all([
        productLocator.click(),
        page.waitForLoadState("load"),
      ]);
      return { page, isFindNvMid: true };
    }
    return { page, isFindNvMid: false };
  } catch (e) {
    console.error(e.message);
    throw Error("nextNumberClick");
  }
}

async function nextNumberClick({ page }) {
  try {
    await Promise.all([
      page.keyboard.press("End"),
      page.waitForLoadState("load"),
    ]);
    await wait(1000);
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("nextNumberClick");
  }
}

searchNVMID();
