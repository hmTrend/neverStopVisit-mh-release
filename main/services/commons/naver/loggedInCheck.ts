import { Page } from "playwright";
import { cookieNstateSave } from "../PuppeteerEngine/cookieNstateSave";
import { GetFingerPrintNowLogData } from "../../../lib/apollo/finger-print.apollo";
import { addItemToDatabase } from "../../../api/notion/api.patchDayNowCount";

export const loggedInCheck = async ({
  page,
  _id,
}: {
  page: Page;
  _id: string;
}) => {
  try {
    let isLoggedIn = "YES";
    // 확장 영역 버튼이 나타날 때까지 대기
    await page.waitForSelector(".sha_service .sha_aside_link", {
      state: "visible",
    });
    // 버튼 클릭
    await page.click(".sha_service .sha_aside_link");
    // 페이지 로딩 완료 대기
    await page.waitForLoadState("networkidle");
    // 로그인 영역 확인
    const nameElement = await page.$("span.name");

    if (nameElement) {
      // span 내부의 텍스트 확인
      const nameText = await nameElement.textContent();
      if (nameText === "로그인") {
        isLoggedIn = "NO";
      }
    }

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
    // 닫기 버튼 클릭
    await page.click(".ah_link_landing.ah_close");
    await page.waitForLoadState("networkidle");

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
