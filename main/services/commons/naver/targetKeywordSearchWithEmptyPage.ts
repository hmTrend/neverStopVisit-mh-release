import { Page } from "playwright";
import wait from "waait";
import { PuppeteerEngine } from "../PuppeteerEngine";

export const targetKeywordSearchWithEmptyPage = async ({
  page = undefined,
  targetKeyword = "염창동카페",
  isTest = false,
}: {
  page?: Page;
  targetKeyword?: string;
  isTest?: boolean;
} = {}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
        cookie: "",
        networkSpeed: "3G",
      });
      page = test.page;
    }

    for (let i = 0; i < 3; i++) {
      try {
        const searchInput = page.locator("#nx_query");
        await searchInput.waitFor({ state: "visible", timeout: 30 * 1000 });
        await wait(1000);

        // 요소가 존재하는지 확인하고 텍스트 입력
        if (await searchInput.isVisible()) {
          await searchInput.click();
          await wait(1000);
          const queryInput = page.locator("#nx_query");
          await queryInput.pressSequentially(targetKeyword, { delay: 100 });
          await wait(500);
        } else {
          console.log("I can't find the search bar.");
        }
        break;
      } catch (e) {
        console.error(e.message);
        if (i === 2) {
          throw Error(
            "targetKeywordSearchWithEmptyPage > naverKeywordSearch input don't click",
          );
        }
        await wait(3 * 1000);
      }
    }

    const searchButton = page.locator("button.btn_search");
    try {
      // 검색 버튼이 나타날 때까지 대기하고 클릭
      await searchButton.waitFor({ state: "visible", timeout: 60 * 1000 });
      await searchButton.click();
      await page.waitForLoadState("domcontentloaded");
      await wait(1000);
    } catch (error) {
      console.log(
        "searchButton > I can't find the search bar. > ",
        error.message,
      );
      throw Error(
        "ERR > targetKeywordSearchWithEmptyPage > I can't find the search bar.",
      );
    }
  } catch (e) {
    console.error(e.message);
    throw Error(`targetKeywordSearchWithEmptyPage > ${e.message}`);
  }

  return { page };
};

// targetKeywordSearchWithEmptyPage();
