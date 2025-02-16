import { typeText, waitAndClick } from "../../atoms/playwright/engine";
import { gotoPage } from "./gotoPage";

export async function inputClickAndInputTextAndButtonClick({
  page = undefined,
  text = "문제적커피",
  selector = "",
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
    await waitAndClick({ page, selector: "#input_text" });
    await typeText({
      page,
      text: "문제적커피",
      selector: "#input_text",
      options: { clearFirst: true, delay: 300 },
    });
    await waitAndClick({ page, selector: 'button[data-shp-area-id="search"]' });
  } catch (e) {
    console.error(e.message);
    throw "inputClickAndInputTextAndButtonClick";
  }
}

// inputClickAndInputTextAndButtonClick();
