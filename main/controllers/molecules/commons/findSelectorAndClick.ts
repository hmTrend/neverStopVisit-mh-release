import { gotoPage } from "./gotoPage";
import { createNetworkManager, pressKey } from "../../atoms/playwright/engine";
import waait from "waait";

export async function findSelectorAndClick({
  isTest = true,
  page = undefined,
  // selector = '[id="_sr_lst_86767716461"]',
  selector = { getByRole: "button", name: "상세정보 펼쳐보기" }, // 쇼핑 > 상세정보 펼쳐보기
  scrollCallback = undefined,
} = {}) {
  if (isTest) {
    const { getPage } = await gotoPage({
      // url: "https://msearch.shopping.naver.com/search/all?query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&prevQuery=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&vertical=search",
      url: "https://smartstore.naver.com/brainiaccoffee/products/9223216138?NaPm=ct%3Dm78alh4g%7Cci%3D89ea470465d8570fb8fc540863e792ffc477851c%7Ctr%3Dslsl%7Csn%3D2289429%7Chk%3D38159a168f115ce568c0260b67bcf6a22860b511&nl-au=6983f8990d554f28aa6904730156551a&nl-query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC",
    });
    page = getPage;
  }
  try {
    const networkManager = createNetworkManager(page);
    await networkManager.waitForAllRequests();
    if (scrollCallback) await scrollCallback({ page });
    const element = page.getByRole(selector.getByRole, {
      name: selector.name,
    });
    // 스크롤해서 요소가 화면에 보이게 하기
    await element.scrollIntoViewIfNeeded();

    await page.waitForTimeout(1000); // 스크롤 후 잠시 대기

    await element.click({ force: true }); // force 옵션 추가
    console.log("Successfully clicked element");
  } catch (e) {
    console.error(e.message);
    throw `findTargetItemAndClick > ${e.message}`;
  }
}

findSelectorAndClick({
  scrollCallback: async ({ page }) => await pressKey({ page, select: "End" }),
});
