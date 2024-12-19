import { Page } from "playwright";

export const goToShopping = async ({ page }: { page: Page }) => {
  try {
    await Promise.all([
      page.waitForLoadState("load"),
      page.getByRole("link", { name: "스토어" }).first().click(),
    ]);
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error(`goToShopping > ${e.message}`);
  }
};
