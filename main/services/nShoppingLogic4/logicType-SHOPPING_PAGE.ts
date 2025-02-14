import { isPopup } from "./isPopup";
import { expandProductDetails } from "./expandProductDetails";
import wait from "waait";
import { makeAPurchase } from "./makeAPurchase";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";
import { searchNaverPriceCompare } from "./searchNaverPriceCompare";
import { loggedInCheckWithEmptyPage } from "../commons/naver/loggedInCheckWithEmptyPage";
import { targetKeywordSearchWithEmptyPage } from "../commons/naver/targetKeywordSearchWithEmptyPage";

export async function logicTypeSHOPPING_PAGE({
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
  await loggedInCheckWithEmptyPage({ page, _id: targetCookieId });
  {
    const { page: page0 } = await targetKeywordSearchWithEmptyPage({
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
