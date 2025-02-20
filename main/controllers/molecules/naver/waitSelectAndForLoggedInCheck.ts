import { BrowserManager } from "../../atoms/playwright/BrawserManager";
import { gotoPage } from "../commons/gotoPage";
import { DataCookieOver19 } from "../../atoms/user/data.cookie";

export async function waitSelectAndForLoggedInCheck({
  waitSelect = "i.spnew.ico_arr", // 네이버 빈페이지 마지막에 나오는 화살표
  browserManager = undefined,
  isTest = false,
}: {
  waitSelect?: string;
  browserManager?: BrowserManager;
  isTest?: boolean;
} = {}) {
  if (isTest) {
    const { getBrowserManager } = await gotoPage({
      is3gMode: false,
      cpuThrottlingRate: 0,
      cookies: DataCookieOver19,
      url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
      // 네이버 빈페이지
    });
    browserManager = getBrowserManager;
  }

  try {
    await browserManager.navigateToPage({
      url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
      options: { waitUntil: "load" },
    });
    await browserManager.page.waitForSelector(waitSelect);
    const links = await browserManager.page
      .locator("div.footer_etc > span.item > a.link")
      .all();
    for (const link of links) {
      const text = await link.innerText();
      if (text === "로그아웃") {
        return;
      }
      if (text === "로그인") {
        throw Error("waitSelectAndBetweenSelectCheck > this is login button");
      }
    }
  } catch (e) {
    throw Error(`waitSelectAndBetweenSelectCheck > ${e.message}`);
  }
}

// waitSelectAndForLoggedInCheck();
