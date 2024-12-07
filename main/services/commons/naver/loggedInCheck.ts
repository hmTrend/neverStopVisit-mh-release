import { Page } from "playwright";
import { cookieNstateSave } from "../PuppeteerEngine/cookieNstateSave";
import wait from "waait";

export const loggedInCheck = async ({
  page,
  _id,
}: {
  page: Page;
  _id: string;
}) => {
  try {
    await wait(2000);
    console.log(11);
    const logoutButton = await page
      .locator("[data-fclk='fotcontlogout']")
      .isVisible();
    console.log(22);
    if (!logoutButton) {
      console.log(33);
      await cookieNstateSave({ page, _id, nState: "미로그인" });
      throw Error("this is not loggedIn");
    }
    console.log(44);
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("loggedInCheck");
  }
};
