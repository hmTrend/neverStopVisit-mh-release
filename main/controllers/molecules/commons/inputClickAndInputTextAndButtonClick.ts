import { gotoPage } from "./gotoPage";

export async function inputClickAndInputTextAndButtonClick({
  browserManager = undefined,
  text = "문제적커피",
  inputSelector = "#input_text",
  clickSelector = 'button[data-shp-area="scb.search"]',
  options = { clearFirst: true, delay: 300 },
  isTest = false,
}: {
  isTest?: boolean;
  text?: string;
  browserManager?: any;
  inputSelector?: string;
  clickSelector?: string;
  options?: { clearFirst?: boolean; delay?: number };
} = {}) {
  if (isTest) {
    const { getBrowserManager } = await gotoPage({
      url: "https://search.shopping.naver.com/home",
    });
    browserManager = getBrowserManager;
  }
  try {
    const networkManager = browserManager.createNetworkManager();
    await networkManager.waitForAllRequests();
    await browserManager.waitAndClick({ selector: inputSelector });
    await browserManager.typeText({
      text,
      selector: inputSelector,
      options,
    });
    await browserManager.waitAndClick({ selector: clickSelector });
  } catch (e) {
    console.error(`inputClickAndInputTextAndButtonClick > ${e.message}`);
    throw Error(`inputClickAndInputTextAndButtonClick > ${e.message}`);
  }
}

// inputClickAndInputTextAndButtonClick();
