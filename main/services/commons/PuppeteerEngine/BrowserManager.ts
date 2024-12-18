import { globalBrowsers } from "../../../lib/const/constVar";

export async function closeAllBrowsers() {
  try {
    await Promise.all(
      globalBrowsers.browsers.map(async (browser) => {
        await browser.close();
      }),
    );

    // 배열 초기화
    globalBrowsers.browsers = [];
    console.log("All browsers have been closed");
  } catch (error) {
    console.error("Error closing browsers:", error);
    throw new Error(`closeAllBrowsers > ${error.message}`);
  }
}
