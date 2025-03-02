import { Page } from "playwright";
import { cookieNstateSave } from "../PuppeteerEngine/cookieNstateSave";
import { GetFingerPrintNowLogData } from "../../../lib/apollo/finger-print.apollo";
import { apiNotionPatchLoginIssue } from "../../../api/notion/api.patchLoginIssue";
import wait from "waait";
import { PuppeteerEngine } from "../PuppeteerEngine";

export const loggedInCheck = async ({
  page,
  _id,
  isTest = false,
}: {
  page: Page;
  _id: string;
  isTest?: boolean;
}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
        cookie: "",
      });
      page = test.page;
    }

    let isLoggedIn = "YES";
    // 확장 영역 버튼이 나타날 때까지 대기
    await page.waitForSelector(".sha_service .sha_aside_link", {
      state: "visible",
    });
    // 버튼 클릭
    await page.click(".sha_service .sha_aside_link");
    // 페이지 로딩 완료 대기
    await page.waitForLoadState("domcontentloaded");
    await wait(2000);
    {
      /** 비동기 안내문 끄기 **/
      try {
        const confirmBtn = page.locator("button.la_option", {
          hasText: "확인",
        });
        if ((await confirmBtn.count()) > 0) {
          await wait(500);
          await confirmBtn.click();
          await wait(1000);
        }
      } catch (e) {
        console.error(`loggedInCheck > ${e.message}`);
      }
    }

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
        await apiNotionPatchLoginIssue({ data });
      } catch (e) {
        console.error(e.message);
      }
      await cookieNstateSave({ page, _id, nState: "미로그인" });
      await page.close();
      throw Error("this is not loggedIn");
    }
    // 닫기 버튼 클릭
    await page.click(".ah_link_landing.ah_close");
    await page.waitForLoadState("domcontentloaded");
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error(`loggedInCheck > ${e.message}`);
  }
};
