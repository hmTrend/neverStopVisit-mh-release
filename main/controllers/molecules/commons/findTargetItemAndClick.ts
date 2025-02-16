import { gotoPage } from "./gotoPage";

export async function findTargetItemAndClick({
  isTest = false,
  page = undefined,
  selector = '[id="_sr_lst_86767716461"]',
} = {}) {
  if (isTest) {
    const { getPage } = await gotoPage({
      url: "https://msearch.shopping.naver.com/search/all?query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&prevQuery=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&vertical=search",
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
    throw "findTargetItemAndClick";
  }
}

// findTargetItemAndClick();
