import { Browser, Page, chromium, devices } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";

export const initialize = async ({
  url,
  browser,
  page,
  pages,
  chromiumEngine,
  cookie,
}: {
  url: string;
  browser: Browser;
  page: Page;
  chromiumEngine: typeof chromium;
  pages: Page[];
  cookie;
}) => {
  browser = await chromiumEngine.launch({ headless: false });
  const context = await browser.newContext(devices["iPhone 15 Pro Max"]);
  if (cookie && cookie.length > 0) {
    const formattedCookies = formatCookiesForPlaywright(cookie);
    await context.addCookies(formattedCookies);
  }
  page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  return { page };
};
