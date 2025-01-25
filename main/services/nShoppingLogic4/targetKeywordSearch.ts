import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const targetKeywordSearch = async ({
  page = undefined,
  targetKeyword = "가정용제빙기 미니",
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
      });
      page = test.page;
    }

    // 이메일 이미지 나타나는지 기다리기
    await page.waitForSelector(
      'img.shs_service_m[src="https://s.pstatic.net/static/www/mobile/edit/20240926_0/upload_1727340694234hLngf.png"]',
      {
        state: "visible", // 실제로 화면에 보이는지 확인
        timeout: 90 * 1000, // 5초 타임아웃
      },
    );
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
          console.log("I can't find the search bar.");
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
      await searchButton.click();
      await page.waitForLoadState("networkidle");
    } catch (error) {
      console.log("I can't find the search bar. > ", error.message);
      throw Error("ERR > targetKeywordSearch > I can't find the search bar.");
    }
  } catch (e) {
    console.error(e.message);
    throw Error(`targetKeywordSearch > ${e.message}`);
  }

  return { page };
};

// targetKeywordSearch();
