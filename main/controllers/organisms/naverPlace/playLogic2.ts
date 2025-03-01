import { Page } from "playwright";
import { BrowserManager } from "../../atoms/playwright/BrawserManager";
import { gotoPage } from "../../molecules/commons/gotoPage";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";
import { waitSelectAndForLoggedInCheck } from "../../molecules/naver/waitSelectAndForLoggedInCheck";
import { inputClickAndInputTextAndButtonClick } from "../../molecules/commons/inputClickAndInputTextAndButtonClick";
import { clickTargetPlaceOrGoToNextStep } from "../../molecules/naverPlace/clickTargetPlaceOrGoToNextStep";
import { lastActionRandomClick } from "../../molecules/naverPlace/lastActionRandomClick";

export async function playLogic2({
  targetKeyword = "강남맛집",
  placeNumber = "234267045",
  cookies = [],
  delayTime = 5,
} = {}) {
  /**
   * 네이버 빈 페이지 > 네이버검색! > 플레이스 > 더보기 > 블로그 리뷰 > 랜덤클릭 > 플레이스
   * **/
  let page: Page;
  let browserManager: BrowserManager;
  try {
    const { getPage, getBrowserManager } = await gotoPage({
      is3gMode: false,
      cpuThrottlingRate: 0,
      url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
      contextCallback: async (browser) =>
        BrowserManager.createMobileContext(
          getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
          browser,
        ),
      loginCheckCallback: async ({ browserManager }) =>
        waitSelectAndForLoggedInCheck({ browserManager }),
      cookies,
    });
    page = getPage;
    browserManager = getBrowserManager;

    await inputClickAndInputTextAndButtonClick({
      browserManager,
      page,
      text: targetKeyword,
      inputSelector: "#nx_query",
      clickSelector: 'button.btn_search[type="submit"]',
      options: { clearFirst: true, delay: 300 },
    });
    await clickTargetPlaceOrGoToNextStep({ placeNumber, page, browserManager });
    await lastActionRandomClick({
      placeNumber,
      page,
      browserManager,
      delayTime,
    });
    await browserManager?.cleanup();
  } catch (e) {
    await browserManager?.cleanup();
    console.error(`playLogic1 > ${e.message}`);
    throw Error(`playLogic1 > ${e.message}`);
  }
}

// playLogic1();
