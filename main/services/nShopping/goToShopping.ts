import { Page } from "playwright";

export const goToShopping = async ({ page }: { page: Page }) => {
  await page.getByRole("link", { name: "스토어" }).click();
  return { page };
};
