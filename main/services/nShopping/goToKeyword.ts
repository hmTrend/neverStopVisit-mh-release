import { Page } from "playwright";
import wait from "waait";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";

export const goToKeyword = async ({
  page = undefined,
  query = "수분크림",
  isTest = true,
}: {
  page?: Page;
  query?: string;
  isTest?: boolean;
} = {}) => {
  for (let i = 0; i < 3; i++) {
    try {
      if (isTest) {
        const test = new PuppeteerEngine();
        await test.initialize({
          url: "https://shopping.naver.com/ns/home",
          cookie: "",
        });
        page = test.page;
      }

      // 팝업창 대응
      await wait(1000);
      await clickSwipeCoachMark({ page });
      await wait(1000);
      await avoidViewingForADayLayer({ page });
      await page.getByRole("button", { name: "상품, 브랜드 입력" }).click();
      await wait(1500);

      // 검색어 입력
      const searchInput = page.locator("#input_text");
      await searchInput.waitFor({ state: "visible" });
      await searchInput.fill(query);
      await wait(1500);

      // 검색 실행 및 결과 페이지 로드 대기
      const searchExecuteButton = page.locator(
        "button._searchInput_button_search_pA3ap",
      );
      await Promise.all([
        page.waitForLoadState("domcontentloaded"),
        searchExecuteButton.click(),
      ]);
      return { page };
    } catch (e) {
      console.error(e.message);
      if (i === 2) {
        throw Error(`goToKeyword > ${e.message}`);
      }
      await wait(3 * 1000);
    }
  }
};

// 팝업창 좌우로 스와이프해서 다른 탭으로 이동해보세요!
async function clickSwipeCoachMark({ page }) {
  await page.evaluate(() => {
    const element = document.querySelector(
      ".swipeCoachMarkMobile_swipe_coach_mark_mobile__2BVtK",
    );
    if (element) {
      (element as HTMLElement).click();
    }
  });
}

// 하루 동안 보지 않기 - 하단 레이어창
async function avoidViewingForADayLayer({ page }) {
  try {
    // 텍스트가 정확히 일치하는 버튼 찾기
    const button = await page.locator('button:has-text("하루 동안 보지 않기")');

    // 버튼이 존재하는지 확인
    const isVisible = await button.isVisible();

    if (isVisible) {
      // 버튼이 존재하면 클릭
      await button.click();
      return true;
    } else {
      // 버튼이 없으면 false 반환
      return false;
    }
  } catch (error) {
    console.error("Error processing a button :", error);
    return false;
  }
}

goToKeyword();
