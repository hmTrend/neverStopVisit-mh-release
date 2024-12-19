import { Page } from "playwright";
import wait from "waait";

export const goToKeyword = async ({
  page,
  query,
}: {
  page: Page;
  query: string;
}) => {
  for (let i = 0; i < 3; i++) {
    try {
      // 팝업창 대응
      await clickSwipeCoachMark({ page });

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
