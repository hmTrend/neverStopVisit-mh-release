import {
  createMobileContext,
  initBrowser,
  navigateToPage,
  network3gMode,
} from "../../atoms/playwright/engine";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";
import { DataCookieOver19 } from "../../atoms/user/data.cookie";
import { BrowserManager } from "../../atoms/playwright/BrawserManager";

// export async function gotoPage({
//   url,
//   is3gMode = false,
//   contextCallback = async (browser) =>
//     createMobileContext({
//       browser,
//       userAgent:
//         getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
//     }),
//   cookies = [],
// }) {
//   try {
//     const { page, context, browser } = await initBrowser({
//       headless: false,
//       slowMo: 1000,
//       contextCallback,
//       cookies,
//     });
//     await network3gMode({ is3gMode, page, context });
//     await navigateToPage({
//       page,
//       url,
//       options: { waitUntil: "load" },
//     });
//     return { getPage: page, context };
//   } catch (e) {
//     console.error(`gotoNaverEmptyPage > ${e.message}`);
//     throw "gotoPage";
//   }
// }
//
// gotoPage({
//   url: "https://m.smartstore.naver.com/brainiaccoffee/products/9223216138?nl-au=6983f8990d554f28aa6904730156551a&nl-query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC",
//   cookies: DataCookieOver19,
// });

export async function gotoPage({
  url,
  is3gMode = false,
  contextCallback = async (browser) =>
    createMobileContext({
      browser,
      userAgent:
        getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
    }),
  cookies = [],
}) {
  try {
    const browserManager = new BrowserManager();
    await browserManager.init({
      headless: false,
      slowMo: 1000,
      contextCallback,
      cookies,
    });

    await browserManager.network3gMode({ is3gMode });
    await browserManager.navigateToPage({
      url,
      options: { waitUntil: "load" },
    });

    return {
      getPage: browserManager.page,
      context: browserManager.context,
      getBrowserManager: browserManager,
    };
  } catch (e) {
    console.error(`gotoNaverEmptyPage > ${e.message}`);
    throw "gotoPage";
  }
}

// 호출 예시
// gotoPage({
//   url: "https://m.smartstore.naver.com/brainiaccoffee/products/9223216138?nl-au=6983f8990d554f28aa6904730156551a&nl-query=%EB%AC%B4%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC",
//   cookies: DataCookieOver19,
// });
