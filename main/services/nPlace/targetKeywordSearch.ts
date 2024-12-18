import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const targetKeywordSearch = async ({
  page = undefined,
  targetKeyword = "수분크림",
  isTest = false,
}: {
  page?: Page;
  targetKeyword?: string;
  isTest?: boolean;
} = {}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({ url: "https://www.naver.com/", cookie: "" });
      page = test.page;
    }
    for (let i = 0; i < 3; i++) {
      try {
        const searchInput = page.locator("#MM_SEARCH_FAKE");
        await searchInput.waitFor({ state: "visible", timeout: 10 * 1000 });
        await wait(1000);

        // 요소가 존재하는지 확인하고 텍스트 입력
        if (await searchInput.isVisible()) {
          await searchInput.click();
          await wait(1000);
          const queryInput = page.locator("#query");
          await queryInput.fill(targetKeyword);
          await wait(500);
        } else {
          console.log("검색 입력창을 찾을 수 없습니다.");
        }
        break;
      } catch (e) {
        console.error(e.message);
        if (i === 2) {
          throw Error(
            "targetKeywordSearch > naverKeywordSearch input don't click",
          );
        }
        await wait(3 * 1000);
      }
    }

    const searchButton = page.locator("button.MM_SEARCH_SUBMIT");
    try {
      // 검색 버튼이 나타날 때까지 대기하고 클릭
      await searchButton.waitFor({ state: "visible" });
      await Promise.all([
        searchButton.click(),
        page.waitForLoadState("networkidle"),
      ]);
    } catch (error) {
      console.log("검색 버튼을 찾을 수 없습니다:", error);
      throw Error("ERR > targetKeywordSearch > 검색 버튼을 찾을 수 없습니다");
    }
  } catch (e) {
    console.error(e.message);
    throw Error("ERR > targetKeywordSearch");
  }

  return { page };
};

// targetKeywordSearch();
