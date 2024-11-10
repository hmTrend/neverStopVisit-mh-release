import { Page } from "playwright";

export const goToKeyword = async ({ page }: { page: Page }) => {
  try {
    await page.getByRole("button", { name: "상품, 브랜드 입력" }).click();
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("goToKeyword");
  }
};
