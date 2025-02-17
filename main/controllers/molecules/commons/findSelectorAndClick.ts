import { gotoPage } from "./gotoPage";

export async function findSelectorAndClick({
  isTest = false,
  page = undefined,
  // selector = '[id="_sr_lst_86767716461"]',
  selector = 'button[data-shp-area-id="more"]',
} = {}) {
  if (isTest) {
    const { getPage } = await gotoPage({
      // url: "https://msearch.shopping.naver.com/search/all?query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&prevQuery=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&vertical=search",
      url: "https://m.smartstore.naver.com/brainiaccoffee/products/9223216138?NaPm=ct%3Dm78alh4g%7Cci%3D89ea470465d8570fb8fc540863e792ffc477851c%7Ctr%3Dslsl%7Csn%3D2289429%7Chk%3D38159a168f115ce568c0260b67bcf6a22860b511&nl-au=6983f8990d554f28aa6904730156551a&nl-query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC",
    });
    page = getPage;
  }
  try {
    const element = page.locator(selector);
    if (await element.isVisible()) {
      await element.click();
      console.log(`Successfully clicked element with ID`);
    }
  } catch (e) {
    console.error(e.message);
    throw `findTargetItemAndClick > ${e.message}`;
  }
}

// findSelectorAndClick();
