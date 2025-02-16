import { initBrowser, navigateToPage } from "../../atoms/playwright/engine";

export async function gotoPage({ url }) {
  try {
    const { page } = await initBrowser({
      headless: false,
      slowMo: 0,
      mobile: { isMobile: true, device: "iPad Pro 11" },
    });
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

// gotoPage();
