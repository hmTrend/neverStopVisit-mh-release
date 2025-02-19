import { gotoPage } from "./gotoPage";
import { Page } from "playwright";

export async function findSelectorAndClick({
  isTest = false,
  page = undefined,
  browserManager = undefined,
  // selector = "#_sr_lst_82805514345",
  // selector = 'a.thumbnail_thumb__Bxb6Z[data-shp-contents-id="82805514345"]', // PC버전
  // selector = { getByRole: "button", name: "상세정보 펼쳐보기" }, // 쇼핑 > 상세정보 펼쳐보기
  selector, // 상세정보 펼쳐보기 / 없을시에도 대응
}: {
  isTest?: boolean;
  page?: Page;
  browserManager?: any;
  selector?: string;
} = {}) {
  if (isTest) {
    const { getPage, getBrowserManager } = await gotoPage({
      is3gMode: true,
      // url: "https://msearch.shopping.naver.com/search/all?query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&vertical=search",
      // url: "https://search.shopping.naver.com/search/all?query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&vertical=search", // PC검색결과
      url: "https://m.smartstore.naver.com/brainiaccoffee/products/9223216138?NaPm=ct%3Dm7bgx1m8%7Cci%3Da8ff3659e7c60c235a3a9e2dc450df7b8209dedc%7Ctr%3Dslsl%7Csn%3D2289429%7Chk%3D09ab8c9ee88a8588fa5b622b5ad50dd26cdc29dd&nl-au=5fbc33cb424747269999a30a205c10ad&nl-query=%EC%BB%A4%ED%94%BC%EC%9B%90%EB%91%90+%EB%AC%B8%EC%A0%9C%EC%A0%81",
      // 200g 원두 커피 문제적커피 로스팅 브라질 세하도 [원산지:브라질] 모바일 상세정보 펼쳐보기 없음
    });
    page = getPage;
    browserManager = getBrowserManager;
  }
  try {
    const networkManager = browserManager.createNetworkManager();
    await networkManager.waitForAllRequests();

    const element = page.locator(selector);
    await page.waitForTimeout(1000); // 스크롤 후 잠시 대기
    await element.click({ timeout: 3000 }); // force 옵션 추가
  } catch (e) {
    console.error(e.message);
    throw Error(`findTargetItemAndClick > ${e.message}`);
  }
}

// findSelectorAndClick({
//   scrollCallback: async ({ browserManager }) =>
//     await browserManager.pressKey({ select: "End" }),
// });

// findSelectorAndClick();
