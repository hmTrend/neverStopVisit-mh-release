import { Page } from "playwright";
import { cookieNstateSave } from "../PuppeteerEngine/cookieNstateSave";

export const loggedInCheck = async ({
  page,
  _id,
}: {
  page: Page;
  _id: string;
}) => {
  try {
    const logoutButton = await page
      .locator("[data-fclk='fotcontlogout']")
      .isVisible();
    if (!logoutButton) {
      await cookieNstateSave({ page, _id, nState: "미로그인" });
      throw Error("this is not loggedIn");
    }
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("loggedInCheck");
  }
};
