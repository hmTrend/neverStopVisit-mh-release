import { Page } from "playwright";

export const loggedInCheck = async ({ page }: { page: Page }) => {
  try {
    const logoutButton = await page
      .locator("[data-fclk='fotcontlogout']")
      .isVisible();
    if (!logoutButton) {
      throw Error("this is not loggedIn");
    }
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("loggedInCheck");
  }
};
