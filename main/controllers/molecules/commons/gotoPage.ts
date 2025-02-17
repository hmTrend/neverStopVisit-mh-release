import {
  createMobileContext,
  initBrowser,
  navigateToPage,
  network3gMode,
} from "../../atoms/playwright/engine";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";

export async function gotoPage({ url }) {
  try {
    console.log(
      getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
    );
    const { page, context, browser } = await initBrowser({
      headless: false,
      slowMo: 1000,
      contextCallback: async (browser) =>
        createMobileContext({
          browser,
          userAgent:
            getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(),
        }),
    });
    // await network3gMode({ is3gMode: false, page, context });
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

// gotoPage({ url: "https://search.shopping.naver.com/home" });
