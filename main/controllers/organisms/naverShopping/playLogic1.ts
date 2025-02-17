import { gotoPage } from "../../molecules/commons/gotoPage";
import { inputClickAndInputTextAndButtonClick } from "../../molecules/commons/inputClickAndInputTextAndButtonClick";
import { findSelectorAndClick } from "../../molecules/commons/findSelectorAndClick";
import {
  createMobileContext,
  pressKey,
  switchToOpenedTab,
} from "../../atoms/playwright/engine";
import { Page } from "playwright";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";

export async function playLogic1({
  targetKeyword = "문제적커피",
  nvMid = "82805514345",
} = {}) {
  /**
   * 네이버 가격비교 페이지 > 상품검색 > 상세페이지 > 상세정보 펼쳐보기
   * **/
  try {
    let page: Page;
    const { getPage, context } = await gotoPage({
      url: "https://search.shopping.naver.com/home",
      contextCallback: async (browser) =>
        createMobileContext({
          browser,
          userAgent:
            getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
        }),
    });
    page = getPage;
    await inputClickAndInputTextAndButtonClick({
      page,
      text: targetKeyword,
      inputSelector: "#input_text",
      clickSelector: 'button[data-shp-area="scb.search"]',
      options: { clearFirst: true, delay: 300 },
    });
    await findSelectorAndClick({
      page,
      selector: `#_sr_lst_${nvMid}`,
    });
    const { latestPage } = await switchToOpenedTab({ context });
    page = latestPage;
    await findSelectorAndClick({
      page,
      selector: { getByRole: "button", name: "상세정보 펼쳐보기" },
      scrollCallback: async ({ page }) =>
        await pressKey({ page, select: "End" }),
    });
  } catch (e) {
    console.error(`playLogic1 > ${e.message}`);
    throw `playLogic1 > ${e.message}`;
  }
}

// playLogic1();
