import { gotoPage } from "./gotoPage";
import { Page } from "playwright";

export async function findSelectorAndClick({
  isTest = false,
  page = undefined,
  browserManager = undefined,
  selector = "#_sr_lst_82805514345",
  // selector = 'a.thumbnail_thumb__Bxb6Z[data-shp-contents-id="82805514345"]', // PC버전
  // selector = { getByRole: "button", name: "상세정보 펼쳐보기" }, // 쇼핑 > 상세정보 펼쳐보기
  scrollCallback = undefined,
}: {
  isTest?: boolean;
  page?: Page;
  browserManager?: any;
  selector?:
    | string
    | {
        getByRole: string;
        name: string;
      };
  scrollCallback?: (params: { page: Page }) => Promise<void>;
} = {}) {
  if (isTest) {
    const { getPage, getBrowserManager } = await gotoPage({
      url: "https://msearch.shopping.naver.com/search/all?query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&vertical=search",
      // url: "https://search.shopping.naver.com/search/all?query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&vertical=search", // PC검색결과
      // url: "https://smartstore.naver.com/brainiaccoffee/products/9223216138?NaPm=ct%3Dm78alh4g%7Cci%3D89ea470465d8570fb8fc540863e792ffc477851c%7Ctr%3Dslsl%7Csn%3D2289429%7Chk%3D38159a168f115ce568c0260b67bcf6a22860b511&nl-au=6983f8990d554f28aa6904730156551a&nl-query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC",
    });
    page = getPage;
    browserManager = getBrowserManager;
  }
  try {
    const networkManager = browserManager.createNetworkManager(page);
    await networkManager.waitForAllRequests();
    if (scrollCallback) {
      await scrollCallback({ page });
      await page.locator('button:has-text("상세정보 펼쳐보기")').waitFor();
    }
    const element = transSelecterType({ page, selector });
    await element.scrollIntoViewIfNeeded({ timeout: 1000 });
    await page.waitForTimeout(1000); // 스크롤 후 잠시 대기
    await element.click({ timeout: 1000 }); // force 옵션 추가
    return { getPage: page };
  } catch (e) {
    console.error(e.message);
    throw Error(`findTargetItemAndClick > ${e.message}`);
  }
}

// findSelectorAndClick({
//   scrollCallback: async ({ page }) => await pressKey({ page, select: "End" }),
// });

// findSelectorAndClick();

function transSelecterType({ page, selector }: { page: Page; selector: any }) {
  return typeof selector === "string"
    ? page.locator(selector)
    : page.getByRole(selector.getByRole, { name: selector.name });
}
