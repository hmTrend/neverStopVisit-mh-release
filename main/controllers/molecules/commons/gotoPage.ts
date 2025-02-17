import {
  createMobileContext,
  initBrowser,
  navigateToPage,
  network3gMode,
} from "../../atoms/playwright/engine";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";

export async function gotoPage({ url }) {
  try {
    const { page, context, browser } = await initBrowser({
      headless: false,
      slowMo: 1000,
      // contextCallback: async (browser) =>
      //   createMobileContext({
      //     browser,
      //     userAgent:
      //       getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
      //   }),
    });
    await network3gMode({ is3gMode: false, page, context });
    await navigateToPage({
      page,
      url,
      options: { waitUntil: "load" },
    });
    return { getPage: page };
  } catch (e) {
    console.error(`gotoNaverEmptyPage > ${e.message}`);
    throw "gotoPage";
  }
}

// gotoPage({
//   url: "https://smartstore.naver.com/brainiaccoffee/products/9223216138?NaPm=ct%3Dm78alh4g%7Cci%3D89ea470465d8570fb8fc540863e792ffc477851c%7Ctr%3Dslsl%7Csn%3D2289429%7Chk%3D38159a168f115ce568c0260b67bcf6a22860b511&nl-au=6983f8990d554f28aa6904730156551a&nl-query=%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC",
// });
