import { gotoPage } from "./gotoPage";
import { Page } from "playwright";

export async function findSelectorAndScroll({
  isTest = false,
  page = undefined,
  browserManager = undefined,
  selector = ".place_section_header_title", // 상세정보 펼쳐보기 / 없을시에도 대응
}: {
  isTest?: boolean;
  page?: Page;
  browserManager?: any;
  selector?: string;
} = {}) {
  if (isTest) {
    const { getPage, getBrowserManager } = await gotoPage({
      is3gMode: false,
      cpuThrottlingRate: 0,
      url: "https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&ssc=tab.m.all&oquery=&tqi=iJNbTlqVIOhssniJdF8ssssssSo-381109&query=%EA%B0%95%EB%82%A8%EB%A7%9B%EC%A7%91",
      // 강남맛집 모바일
    });
    browserManager = getBrowserManager;
    page = getPage;
  }
  try {
    const networkManager = browserManager.createNetworkManager();
    await networkManager.waitForAllRequests();

    const element = page.locator(selector);
    await element.waitFor({
      state: "visible",
      timeout: 30 * 1000, // 60초
    });
    await page.waitForTimeout(1000);
    await element.scrollIntoViewIfNeeded();
  } catch (e) {
    console.error(e.message);
    throw Error(`findTargetItemAndClick > ${e.message}`);
  }
}

// findSelectorAndScroll();
