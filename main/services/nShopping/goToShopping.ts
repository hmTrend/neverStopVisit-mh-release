import { Page } from "playwright";

export const goToShopping = async ({ page }: { page: Page }) => {
  try {
    await page.getByRole("link", { name: "스토어" }).first().click();
    await page.waitForLoadState("load");
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("goToShopping");
  }
};
