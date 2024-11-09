import { Page } from "playwright";

export const goToShopping = async ({ page }: { page: Page }) => {
  await page.getByRole("link", { name: "스토어" }).first().click();
  await page.waitForLoadState("networkidle");
  return { page };
};
