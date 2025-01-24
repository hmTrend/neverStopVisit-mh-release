import { isPopup } from "./isPopup";
import { loggedInCheck } from "../commons/naver/loggedInCheck";
import { searchNVMID } from "./searchNVMID";
import { expandProductDetails } from "./expandProductDetails";
import wait from "waait";
import { makeAPurchase } from "./makeAPurchase";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";
import { targetKeywordSearch } from "./targetKeywordSearch";
import { searchNaverPriceCompare } from "./searchNaverPriceCompare";

export async function logicTypeNAVER_COMPARE({
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
    const { page: page0 } = await targetKeywordSearch({
      page,
      targetKeyword: query,
    });
    page = page0;
  }
  {
    const { page: page0 } = await searchNaverPriceCompare({
      page,
      nvMid,
    });
    page = page0;
  }
  {
    const { page: page0 } = await expandProductDetails({ page });
    page = page0;
    const waitTime = getRandomTime(); // 20~30초
    await wait(waitTime * 1000);
    {
      const { page: page0 } = await makeAPurchase({ page });
      page = page0;
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
