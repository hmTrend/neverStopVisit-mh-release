import { Page } from "playwright";
import wait from "waait";

export const goToKeyword = async ({
  page,
  query,
}: {
  page: Page;
  query: string;
}) => {
  try {
    // 팝업창 대응
    await clickSwipeCoachMark({ page });
    
    // 검색 버튼 클릭 - 두번 클릭하는 부분은 의도된 것 같아 유지
    const searchButton = page.getByRole("button", { name: "상품, 브랜드 입력" });
    await searchButton.waitFor({ state: 'visible' });
    await searchButton.click();
    await wait(1000);
    await searchButton.click();
    
    // 검색어 입력
    const searchInput = page.locator("#input_text");
    await searchInput.waitFor({ state: 'visible' });
    await searchInput.fill(query);
    
    // 검색 실행 및 결과 페이지 로드 대기
    const searchExecuteButton = page.locator("button._searchInput_button_search_pA3ap");
    await Promise.all([
      page.waitForLoadState('load'),
      searchExecuteButton.click()
    ]);
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error(`goToKeyword > ${e.message}`);
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
