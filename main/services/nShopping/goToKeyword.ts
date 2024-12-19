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
    await clickSwipeCoachMark({ page }); // 팝업창 있을시 대응
    await page.getByRole("button", { name: "상품, 브랜드 입력" }).click();
    await wait(1000);
    await page.getByRole("button", { name: "상품, 브랜드 입력" }).click();
    await page.locator("#input_text").fill(query);
    await page
      .locator("button._searchInput_button_search_pA3ap")
      .click({ delay: 1000 });
    await page.waitForLoadState("load");
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("goToKeyword");
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
