import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";

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
    const searchInput = page.locator("#MM_SEARCH_FAKE");

    // 요소가 존재하는지 확인하고 텍스트 입력
    if (await searchInput.isVisible()) {
      await searchInput.fill("강남맛집 치스타리에 강남역점");
    } else {
      console.log("검색 입력창을 찾을 수 없습니다.");
    }

    const searchButton = page.locator("button.MM_SEARCH_SUBMIT");
    try {
      // 검색 버튼이 나타날 때까지 대기하고 클릭
      await searchButton.waitFor({ state: "visible" });
      await searchButton.click();
    } catch (error) {
      console.log("검색 버튼을 찾을 수 없습니다:", error);
    }
  } catch (e) {
    console.error(e.message);
    throw Error("ERR > targetKeywordSearch");
  }

  return { page };
};

// targetKeywordSearch();
