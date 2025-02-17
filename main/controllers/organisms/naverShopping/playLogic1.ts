import { gotoPage } from "../../molecules/commons/gotoPage";
import { inputClickAndInputTextAndButtonClick } from "../../molecules/commons/inputClickAndInputTextAndButtonClick";
import { Page } from "playwright";
import { findSelectorAndClick } from "../../molecules/commons/findSelectorAndClick";

export async function playLogic1() {
  try {
    const { getPage } = await gotoPage({
      url: "https://search.shopping.naver.com/home",
    });
    await inputClickAndInputTextAndButtonClick({
      page: getPage,
      text: "문제적커피",
      inputSelector: 'input[data-shp-area="GNB.input"]',
      clickSelector: 'button[data-shp-area="GNB.search"]',
      options: { clearFirst: true, delay: 300 },
    });
    await findSelectorAndClick({
      page: getPage,
      selector: '[id="_sr_lst_86767716461"]',
    });
  } catch (e) {
    console.error(`playLogic1 > ${e.message}`);
    throw `playLogic1 > ${e.message}`;
  }
}

playLogic1();
