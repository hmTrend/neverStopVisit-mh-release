import { Page } from "playwright";
import { cookieNstateSave } from "../PuppeteerEngine/cookieNstateSave";
import { GetFingerPrintNowLogData } from "../../../lib/apollo/finger-print.apollo";
import wait from "waait";
import { addItemToDatabase } from "../../../api/notion/api.create";

export const loggedInCheck = async ({
  page,
  _id,
}: {
  page: Page;
  _id: string;
}) => {
  try {
    let isLoggedIn;
    await Promise.race([
      // 로그아웃 버튼 찾기
      page
        .locator('a[data-fclk="fot.logout"]')
        .waitFor({ state: "visible", timeout: 60 * 1000 })
        .then(() => (isLoggedIn = "YES"))
        .catch(() => {
          throw Error("this is not find loggedIn");
        }),
      // 로그인 버튼 찾기
      page
        .locator('a[data-fclk="fot.login"]')
        .waitFor({ state: "visible", timeout: 60 * 1000 })
        .then(() => (isLoggedIn = "N0"))
        .catch(() => {
          throw Error("this is not find loggedIn");
        }),
    ]);
    if (isLoggedIn === "NO") {
      try {
        const { data } = await GetFingerPrintNowLogData({ _id });
        await addItemToDatabase({ data });
      } catch (e) {
        console.error(e.message);
      }
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
