import { Page } from "playwright";

export const isPopup = async ({ page }: { page: Page }) => {
  try {
    const isVisible = await page.isVisible("button.lst_btn_close");
    if (isVisible) {
      await page.click("button.lst_btn_close");
      console.log("Close button clicked");
    }
    return { page };
  } catch (e) {
    console.error("isPopup is not found");
    return { page };
  }
};
