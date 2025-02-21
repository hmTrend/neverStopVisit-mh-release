import { createMobileContext } from "../../atoms/playwright/engine";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";
import { BrowserManager } from "../../atoms/playwright/BrawserManager";
import { DataCookieOver19 } from "../../atoms/user/data.cookie";
import { waitSelectAndForLoggedInCheck } from "../naver/waitSelectAndForLoggedInCheck";

export async function gotoPage({
  url,
  is3gMode = false,
  cpuThrottlingRate = 0,
  contextCallback = async (browser) =>
    BrowserManager.createMobileContext(
      getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
      browser,
    ),
  cookies = [],
  loginCheckCallback = async ({ browserManager }) => {},
}) {
  try {
    const browserManager = new BrowserManager();
    await browserManager.init({
      headless: false,
      slowMo: 1000,
      contextCallback,
      cookies,
    });

    await browserManager.networkAndCpuThrottling({
      is3gMode,
      cpuThrottlingRate,
    });

    await loginCheckCallback({ browserManager });

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
    console.error(`gotoPage > ${e.message}`);
    throw Error(`gotoPage > ${e.message}`);
  }
}

// 호출 예시
// gotoPage({
//   url: "https://m.smartstore.naver.com/brainiaccoffee/products/9223216138?nl-au=6983f8990d554f28aa6904730156551a&nl-query=%EB%AC%B4%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC",
//   cookies: DataCookieOver19,
// });
