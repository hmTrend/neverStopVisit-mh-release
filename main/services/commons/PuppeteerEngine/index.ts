import { initialize } from "./initialize";
import { Browser, Page, chromium } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";

export class PuppeteerEngine {
  chromiumEngine: typeof chromium; // 'typeof chromium'으로 수정
  page: Page;
  pages: Page[];
  browser: Browser;

  constructor() {
    this.chromiumEngine = chromium; // chromium 초기화
    this.pages = []; // pages 배열 초기화
  }

  async initialize({ url, cookie }) {
    try {
      const { page } = await initialize({
        url,
        chromiumEngine: this.chromiumEngine,
        browser: this.browser,
        page: this.page,
        pages: this.pages,
        cookie,
      });
      this.page = page;
    } catch (e) {
      console.error(e.message);
      throw Error("initialize");
    }
  }
}
