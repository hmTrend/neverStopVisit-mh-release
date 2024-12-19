import { Page } from "playwright";
import wait from "waait";

export const searchNVMID = async ({
  page,
  nvMid,
}: {
  page: Page;
  nvMid: string;
}) => {
  try {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 5; j++) {
        const { isFindNvMid } = await findNvMid({ page, nvMid });
        if (isFindNvMid) {
          return { page, isFindNvMid: true };
        }
        await Promise.all([
          page.waitForLoadState("load"),
          page.keyboard.press("End"),
        ]);
        await wait(1000);
      }
      await nextNumberClick({ page });
    }
  } catch (e) {
    console.error(e.message);
    throw Error("searchNVMID");
  }
  return { page, isFindNvMid: false };
};

async function findNvMid({ page, nvMid }) {
  try {
    const elements = await page
      .locator(`[data-shp-contents-id="${nvMid}"]`)
      .filter({
        hasNot: page.locator('span.blind:text-is("광고")'),
      })
      .count();

    if (elements > 0) {
      const productLocator = page
        .locator(`[data-shp-contents-id="${nvMid}"]`)
        .filter({
          hasNot: page.locator('span.blind:text-is("광고")'),
        })
        .first();
      await productLocator.click();
      await page.waitForLoadState("load");
      return { page, isFindNvMid: true };
    }
    return { page, isFindNvMid: false };
  } catch (e) {
    console.error(e.message);
    throw Error("nextNumberClick");
  }
}

async function nextNumberClick({ page }) {
  try {
    const nextButton = page.locator("button.paginator_btn_next__3fcZx");
    await Promise.all([nextButton.click(), page.waitForLoadState("load")]);
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("nextNumberClick");
  }
}
