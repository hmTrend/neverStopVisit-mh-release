import { gotoPage } from "../../molecules/commons/gotoPage";
import { inputClickAndInputTextAndButtonClick } from "../../molecules/commons/inputClickAndInputTextAndButtonClick";
import { findSelectorAndClick } from "../../molecules/commons/findSelectorAndClick";
import {
  cleanup,
  createMobileContext,
  pressKey,
  switchToOpenedTab,
} from "../../atoms/playwright/engine";
import { Page } from "playwright";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";
import wait from "waait";
import { sameUrlCheckForError } from "../../molecules/commons/sameUrlCheckForError";

export async function playLogic1({
  targetKeyword = "문제적커피",
  nvMid = "82805514345",
  cookies = [],
  delayTime = 30,
} = {}) {
  /**
   * 네이버 가격비교 페이지 > 상품검색 > 상세페이지 > 상세정보 펼쳐보기
   * **/
  let page: Page;
  const { getPage, context } = await gotoPage({
    url: "https://search.shopping.naver.com/home",
    contextCallback: async (browser) =>
      createMobileContext({
        browser,
        userAgent:
          getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
      }),
    cookies,
  });
  page = getPage;
  try {
    await inputClickAndInputTextAndButtonClick({
      page,
      text: targetKeyword,
      inputSelector: "#input_text",
      clickSelector: 'button[data-shp-area="scb.search"]',
      options: { clearFirst: true, delay: 300 },
    });
    await comparePricesFindAllProducts({ nvMid, maxPages: 1, page });
    const { latestPage } = await switchToOpenedTab({ context });
    page = latestPage;
    await sameUrlCheckForError({ page }); // 19세 상품일경우 19세 이상 아이디로만 접근가능
    await findSelectorAndClick({
      page,
      selector: { getByRole: "button", name: "상세정보 펼쳐보기" },
      scrollCallback: async ({ page }) =>
        await pressKey({ page, select: "End" }),
    });
    await wait(delayTime * 1000);
    await cleanup({ page, context });
  } catch (e) {
    await cleanup({ page, context });
    console.error(`playLogic1 > ${e.message}`);
    throw Error(`playLogic1 > ${e.message}`);
  }
}

// playLogic1();

async function comparePricesFindAllProducts({
  page,
  nvMid = "",
  maxPages = 1,
}: {
  page: Page;
  nvMid: string;
  maxPages: number;
}) {
  try {
    await findSelectorAndClick({
      page,
      selector: `#_sr_lst_${nvMid}`,
    });
  } catch (e) {
    console.error(`comparePricesFindAllProducts > ${e.message}`);
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("End");
      await page.waitForLoadState("domcontentloaded");
      await wait(300);
    }
    await findSelectorAndClick({
      page,
      selector: `#_sr_lst_${nvMid}`,
    });
  }
}
