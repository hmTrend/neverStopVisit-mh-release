import { initBrowser, navigateToPage } from "../../atoms/playwright/engine";

export async function gotoSearchNaverShopping() {
  try {
    const { page } = await initBrowser({
      headless: false,
      slowMo: 0,
      mobile: { isMobile: true, device: "iPad Pro 11" },
    });
    await navigateToPage({
      page,
      url: "https://search.shopping.naver.com/home",
      options: { waitUntil: "load" },
    });
  } catch (e) {
    console.error(`gotoNaverEmptyPage > ${e.message}`);
    throw "gotoNaverEmptyPage";
  }
}

// gotoSearchNaverShopping();
