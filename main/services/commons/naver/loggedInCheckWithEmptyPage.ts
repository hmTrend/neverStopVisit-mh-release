import { Page } from "playwright";
import { cookieNstateSave } from "../PuppeteerEngine/cookieNstateSave";
import wait from "waait";
import { PuppeteerEngine } from "../PuppeteerEngine";

export const loggedInCheckWithEmptyPage = async ({
  page = undefined,
  _id = "",
  isTest = false,
}: {
  page?: Page;
  _id?: string;
  isTest?: boolean;
} = {}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
        // cookie: CookieLoggedIn.cookie,
        cookie: "",
      });
      page = test.page;
    }
    for (let i = 0; i < 3; i++) {
      try {
        await checkAndWaitForLogin({ page });
        break;
      } catch (e) {
        if (i >= 2) {
          if (!isTest) {
            await cookieNstateSave({ page, _id, nState: "미로그인" });
          }
          throw Error(`checkAndWaitForLogin > ${e.message}`);
        }
        await page.reload();
        await page.waitForLoadState("networkidle");
        await wait(3 * 1000);
      }
    }
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error(`loggedInCheck > ${e.message}`);
  }
};

async function checkAndWaitForLogin({ page }: { page: Page }) {
  const loginText = page.locator('.footer_etc .link:has-text("로그인")');
  if ((await loginText.count()) > 0) {
    // 로그인 텍스트가 보일 때 실행할 코드
    console.error("this is not loggedIn");
    throw Error("this is not loggedIn");
  }
  console.log("this is loggedIn");
}

// loggedInCheckWithEmptyPage();
