import { Page } from "playwright";

export const googleToNaver = async ({ page }: { page: Page }) => {
  console.log(11);
  await inputTypeCheck({ page });
  console.log(22);
  await Promise.all([
    page.waitForLoadState("networkidle"),
    page.keyboard.press("Enter"),
  ]);
  console.log(33);
  await Promise.all([
    await page.locator('a[href*="naver.com"]').first().click(),
    page.waitForLoadState("networkidle"),
  ]);
  throw new Error("err > targetKeywordSearch >>>> gogogo");
  return { page };
};

async function inputTypeCheck({ page }) {
  const textareaInput = page.locator("textarea.gLFyf");
  const mibInput = page.locator("#mib");

  if ((await textareaInput.count()) > 0) {
    console.log("Found textarea.gLFyf input");
    await textareaInput.fill("네이버");
  } else if ((await mibInput.count()) > 0) {
    console.log("Found #mib input");
    await mibInput.fill("네이버");
  } else {
    console.log("No search input found");
  }
}
