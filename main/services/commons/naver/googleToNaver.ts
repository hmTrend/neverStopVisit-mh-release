import { Page } from "playwright";

export const googleToNaver = async ({ page }: { page: Page }) => {
  await inputTypeCheck({ page });
  await Promise.all([
    page.waitForLoadState("networkidle"),
    page.keyboard.press("Enter"),
  ]);
  await Promise.all([
    page.locator('a[href="https://www.naver.com/"]').click(),
    page.waitForLoadState("networkidle"),
  ]);
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
