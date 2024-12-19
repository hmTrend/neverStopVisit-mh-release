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
    const logoutExists = await Promise.race([
      // 로그아웃 버튼 찾기
      page
        .locator('a[data-fclk="fot.logout"]')
        .waitFor({ state: "visible", timeout: 30 * 1000 })
        .then(() => true)
        .catch(() => false),
      // 로그인 버튼 찾기
      page
        .locator('a[data-fclk="fot.login"]')
        .waitFor({ state: "visible", timeout: 30 * 1000 })
        .then(() => false)
        .catch(() => false),
    ]);
    if (!logoutExists) {
      await cookieNstateSave({ page, _id, nState: "미로그인" });
      throw Error("this is not loggedIn");
    }

    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error(`loggedInCheck > ${e.message}`);
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
