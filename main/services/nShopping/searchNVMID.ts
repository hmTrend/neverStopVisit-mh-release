import { Page } from "playwright";
import wait from "waait";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";

export const searchNVMID = async ({
  page = undefined,
  nvMid = "",
  isTest = true,
}: {
  page?: Page;
  nvMid?: string;
  isTest?: boolean;
  products?: "6600986339";
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
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 5; j++) {
        const { isFindNvMid } = await findNvMid({ page, nvMid });
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
    throw Error("searchNVMID");
  }
  return { page, isFindNvMid: false };
};

async function findNvMid({ page, nvMid }) {
  try {
    const elements = await page
      .locator(`[data-shp-contents-id="${nvMid}"]`)
      .filter({
        hasNot: page.locator('span.blind:text-is("광고")'),
      })
      .count();

    if (elements > 0) {
      const productLocator = page
        .locator(`[data-shp-contents-id="${nvMid}"]`)
        .filter({
          hasNot: page.locator('span.blind:text-is("광고")'),
        })
        .first();
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
    const nextButton = page.locator("button.paginator_btn_next__3fcZx");
    await Promise.all([nextButton.click(), page.waitForLoadState("load")]);
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("nextNumberClick");
  }
}
