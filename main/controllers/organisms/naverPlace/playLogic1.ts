import { Page } from "playwright";
import { BrowserManager } from "../../atoms/playwright/BrawserManager";
import { gotoPage } from "../../molecules/commons/gotoPage";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";
import { waitSelectAndForLoggedInCheck } from "../../molecules/naver/waitSelectAndForLoggedInCheck";
import { inputClickAndInputTextAndButtonClick } from "../../molecules/commons/inputClickAndInputTextAndButtonClick";
import wait from "waait";

export async function playLogic1({
  targetKeyword = "동남지구 맛집",
  nvMid = "82805514345",
  cookies = [],
  delayTime = 30,
} = {}) {
  /**
   * 네이버 빈 페이지 > 네이버검색! > 상세페이지 > 상세정보 펼쳐보기
   * **/
  let page: Page;
  let browserManager: BrowserManager;
  const { getPage, getBrowserManager } = await gotoPage({
    url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
    contextCallback: async (browser) =>
      BrowserManager.createMobileContext(
        getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
        browser,
      ),
    // loginCheckCallback: async ({ browserManager }) =>
    //   waitSelectAndForLoggedInCheck({ browserManager }),
    cookies,
  });
  page = getPage;
  browserManager = getBrowserManager;
  try {
    await inputClickAndInputTextAndButtonClick({
      browserManager,
      text: targetKeyword,
      inputSelector: "#nx_query",
      clickSelector: 'button.btn_search[type="submit"]',
      options: { clearFirst: true, delay: 300 },
    });
    await wait(delayTime * 1000);
    await browserManager.cleanup();
  } catch (e) {
    await browserManager.cleanup();
    console.error(`playLogic1 > ${e.message}`);
    throw Error(`playLogic1 > ${e.message}`);
  }
}

playLogic1();
