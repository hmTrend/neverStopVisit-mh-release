import { googleToNaver } from "../commons/naver/googleToNaver";
import { isPopup } from "./isPopup";
import { loggedInCheck } from "../commons/naver/loggedInCheck";
import { expandProductDetails } from "./expandProductDetails";
import wait from "waait";
import { makeAPurchase } from "./makeAPurchase";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";
import { findTargetBlogLogic4 } from "./findTargetBlog";
import { findTargetShoppingInTargetBlog } from "./findTargetShoppingInTargetBlog";
import { targetKeywordSearch } from "./targetKeywordSearch";

export async function logicTypeBLOG({
  getRandomTime,
  page: page1,
  targetCookieId,
  query,
  targetBlog,
}) {
  let page = page1;
  {
    const { page: page0 } = await googleToNaver({ page });
    page = page0;
  }
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
    const { page: page0 } = await findTargetBlogLogic4({
      page,
      targetBlog,
    });
    page = page0;
  }
  {
    const { page: page0 } = await findTargetShoppingInTargetBlog({
      page,
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
