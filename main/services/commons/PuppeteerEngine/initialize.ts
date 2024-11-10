import { Browser, Page, chromium, devices } from "playwright";

export const initialize = async ({
  url,
  browser,
  page,
  pages,
  chromiumEngine,
}: {
  url: string;
  browser: Browser;
  page: Page;
  chromiumEngine: typeof chromium;
  pages: Page[];
}) => {
  browser = await chromiumEngine.launch({ headless: false });
  const context = await browser.newContext(devices["iPhone 15 Pro Max"]);
  page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  return { page };
};
