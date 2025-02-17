import { gotoPage } from "../../molecules/commons/gotoPage";
import { inputClickAndInputTextAndButtonClick } from "../../molecules/commons/inputClickAndInputTextAndButtonClick";
import { findSelectorAndClick } from "../../molecules/commons/findSelectorAndClick";
import { pressKey, switchToOpenedTab } from "../../atoms/playwright/engine";
import { Page } from "playwright";

export async function playLogic1() {
  /**
   * 네이버 가격비교 페이지 > 상품검색 > 상세페이지 > 상세정보 펼쳐보기
   * **/
  try {
    let page: Page;
    const { getPage, context } = await gotoPage({
      url: "https://search.shopping.naver.com/home",
    });
    page = getPage;
    await inputClickAndInputTextAndButtonClick({
      page,
      text: "문제적커피",
      inputSelector: 'input[data-shp-area="GNB.input"]',
      clickSelector: 'button[data-shp-area="GNB.search"]',
      options: { clearFirst: true, delay: 300 },
    });
    await findSelectorAndClick({
      page,
      selector: 'a.thumbnail_thumb__Bxb6Z[data-shp-contents-id="82805514345"]',
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

playLogic1();
