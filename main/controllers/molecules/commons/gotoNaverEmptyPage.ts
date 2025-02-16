import { initBrowser, navigateToPage } from "../../atoms/playwright/engine";

export async function gotoNaverEmptyPage() {
  try {
    const { page } = await initBrowser({
      headless: false,
      slowMo: 0,
      mobile: { isMobile: true, device: "iPad Pro 11" },
    });
    await navigateToPage({
      page,
      url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
      options: { waitUntil: "load" },
    });
  } catch (e) {
    console.error(`gotoNaverEmptyPage > ${e.message}`);
    throw "gotoNaverEmptyPage";
  }
}

gotoNaverEmptyPage();
