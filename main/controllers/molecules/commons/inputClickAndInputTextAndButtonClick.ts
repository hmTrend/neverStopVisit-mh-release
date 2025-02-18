import {
  createNetworkManager,
  typeText,
  waitAndClick,
} from "../../atoms/playwright/engine";
import { gotoPage } from "./gotoPage";

export async function inputClickAndInputTextAndButtonClick({
  page = undefined,
  text = "문제적커피",
  inputSelector = "#input_text",
  clickSelector = 'button[data-shp-area="scb.search"]',
  options = { clearFirst: true, delay: 300 },
  isTest = false,
} = {}) {
  if (isTest) {
    const { getPage } = await gotoPage({
      url: "https://search.shopping.naver.com/home",
    });
    page = getPage;
  }
  try {
    const networkManager = createNetworkManager(page);
    await networkManager.waitForAllRequests();
    await waitAndClick({ page, selector: inputSelector });
    await typeText({
      page,
      text,
      selector: inputSelector,
      options,
    });
    await waitAndClick({ page, selector: clickSelector });
    return { getPage: page };
  } catch (e) {
    console.error(`inputClickAndInputTextAndButtonClick > ${e.message}`);
    throw Error(`inputClickAndInputTextAndButtonClick > ${e.message}`);
  }
}

// inputClickAndInputTextAndButtonClick();
