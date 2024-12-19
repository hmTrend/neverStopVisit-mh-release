import { Page } from "playwright";
import { cookieNstateSave } from "../PuppeteerEngine/cookieNstateSave";
import wait from "waait";

export const loggedInCheck = async ({
  page,
  _id,
}: {
  page: Page;
  _id: string;
}) => {
  try {
    await naverMainPageCompletedLoadingCheck({ page });
    const logoutExists =
      (await page.locator("[data-fclk='fotcontlogout']").count()) > 0;

    if (!logoutExists) {
      await cookieNstateSave({ page, _id, nState: "미로그인" });
      throw Error("this is not loggedIn");
    }

    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("loggedInCheck");
  }
};

async function naverMainPageCompletedLoadingCheck({ page }) {
  try {
    await page.waitForSelector("#nmap_home_feed_1st", {
      state: "attached",
      timeout: 30 * 1000,
    });
    console.log("Ad element became visible");
    // 추가 로직
  } catch (error) {
    console.log("Ad element did not appear:", error);
  }
}
