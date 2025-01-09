import { googleToNaver } from "../commons/naver/googleToNaver";
import { isPopup } from "./isPopup";
import { loggedInCheck } from "../commons/naver/loggedInCheck";
import { goToShopping } from "./goToShopping";
import { goToKeyword } from "./goToKeyword";
import { plusStoreToComparePricing } from "./plusStoreToComparePricing";
import { searchNVMID } from "./searchNVMID";
import { expandProductDetails } from "./expandProductDetails";
import wait from "waait";
import { makeAPurchase } from "./makeAPurchase";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";

export async function logicTypeNAVER({
  getRandomTime,
  page: page1,
  targetCookieId,
  nvMid,
  query,
}) {
  let page = page1;
  {
    const { page: page0 } = await isPopup({
      page,
    });
    page = page0;
  }
  await loggedInCheck({ page, _id: targetCookieId });
  {
    const { page: page0 } = await goToShopping({
      page,
    });
    page = page0;
  }
  {
    const { page: page0 } = await goToKeyword({
      page,
      query,
    });
    page = page0;
  }
  {
    const { page: page0 } = await plusStoreToComparePricing({
      page,
    });
    page = page0;
  }
  {
    const { page: page0, isFindNvMid } = await searchNVMID({
      page,
      nvMid,
    });
    page = page0;
    if (isFindNvMid) {
      const { page: page0 } = await expandProductDetails({ page });
      page = page0;
      const waitTime = getRandomTime(); // 20~30초
      await wait(waitTime * 1000);
      {
        const { page: page0 } = await makeAPurchase({ page });
        page = page0;
      }
    }
  }
  {
    const { page: page0 } = await cookieNstateSave({
      page,
      _id: targetCookieId,
      nState: "정상",
    });
    page = page0;
  }
}
