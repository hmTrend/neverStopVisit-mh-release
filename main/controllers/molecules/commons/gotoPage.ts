import {
  initBrowser,
  navigateToPage,
  network3gMode,
} from "../../atoms/playwright/engine";

export async function gotoPage({ url }) {
  try {
    const { page, context } = await initBrowser({
      headless: false,
      slowMo: 1000,
      mobile: { isMobile: true, device: "iPad Pro 11" },
    });
    await network3gMode({ is3gMode: true, page, context });
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
