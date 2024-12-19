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

    const element = await Promise.race([
      // 1. role과 name으로 찾기
      page
        .getByRole("button", { name: "상품, 브랜드 입력" })
        .waitFor({ state: "visible", timeout: 5000 })
        .then(async () =>
          page.getByRole("button", { name: "상품, 브랜드 입력" }),
        ),

      // 2. 클래스명으로 찾기
      page
        .locator("button._shoppingHomeSearch_button_gXyNO")
        .waitFor({ state: "visible", timeout: 5000 })
        .then(async () =>
          page.locator("button._shoppingHomeSearch_button_gXyNO"),
        ),

      // 3. SVG를 포함한 버튼 찾기
      page
        .locator('button:has(svg[class*="shoppingHomeSearch_icon"])')
        .waitFor({ state: "visible", timeout: 5000 })
        .then(async () =>
          page.locator('button:has(svg[class*="shoppingHomeSearch_icon"])'),
        ),

      // 4. 텍스트 내용으로 찾기
      page
        .locator('button:has-text("상품, 브랜드 입력")')
        .waitFor({ state: "visible", timeout: 5000 })
        .then(async () => page.locator('button:has-text("상품, 브랜드 입력")')),

      // 5. data attribute로 찾기
      page
        .locator('button[N="a:gnb.allsearch"]')
        .waitFor({ state: "visible", timeout: 5000 })
        .then(async () => page.locator('button[N="a:gnb.allsearch"]')),
    ]);

    await element.click();
    await wait(1500);

    // 검색어 입력
    const searchInput = page.locator("#input_text");
    await searchInput.waitFor({ state: "visible" });
    await searchInput.fill(query);

    // 검색 실행 및 결과 페이지 로드 대기
    const searchExecuteButton = page.locator(
      "button._searchInput_button_search_pA3ap",
    );
    await Promise.all([
      page.waitForLoadState("load"),
      searchExecuteButton.click(),
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
