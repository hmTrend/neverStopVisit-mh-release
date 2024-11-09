import { Page } from "playwright";

export const goToKeyword = async ({ page }: { page: Page }) => {
  console.log(1);
  await page.getByRole("button", { name: "상품, 브랜드 입력" }).click();

  console.log(2);
  return { page };
};
