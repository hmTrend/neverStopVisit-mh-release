export const initialize = async ({ url, browser, page, puppeteer, pages }) => {
  browser = await puppeteer.launch({ headless: false });
  pages = await browser.pages();
  page = pages[0];
  await page.goto(url);
};
