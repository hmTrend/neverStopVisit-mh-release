import { gotoPage } from "./gotoPage";
import { Page } from "playwright";

export async function inputClickAndInputTextAndButtonClick({
  page = undefined,
  browserManager = undefined,
  text = "문제적커피",
  inputSelector = "#input_text",
  clickSelector = 'button[data-shp-area="scb.search"]',
  options = { clearFirst: true, delay: 300 },
  isTest = false,
}: {
  isTest?: boolean;
  page?: Page;
  text?: string;
  browserManager?: any;
  inputSelector?: string;
  clickSelector?: string;
  options?: { clearFirst?: boolean; delay?: number };
} = {}) {
  if (isTest) {
    const { getPage, getBrowserManager } = await gotoPage({
      url: "https://search.shopping.naver.com/home",
    });
    page = getPage;
    browserManager = getBrowserManager;
  }
  try {
    const networkManager = browserManager.createNetworkManager(page);
    await networkManager.waitForAllRequests();
    await networkManager.waitAndClick({ page, selector: inputSelector });
    await networkManager.typeText({
      page,
      text,
      selector: inputSelector,
      options,
    });
    await networkManager.waitAndClick({ page, selector: clickSelector });
    return { getPage: page };
  } catch (e) {
    console.error(`inputClickAndInputTextAndButtonClick > ${e.message}`);
    throw Error(`inputClickAndInputTextAndButtonClick > ${e.message}`);
  }
}

// inputClickAndInputTextAndButtonClick();
