import { initialize } from "./initialize";
import { Browser, Page, BrowserContext } from "playwright";
import { chromium } from "playwright-extra";

export class PuppeteerEngine {
  chromiumEngine: typeof chromium; // 'typeof chromium'으로 수정
  page: Page;
  pages: Page[];
  browser: Browser;
  targetCookie: any;
  targetCookieId: string;
  query: string;
  nvMid: string;
  context: BrowserContext;

  constructor() {
    this.chromiumEngine = chromium; // chromium 초기화
    this.pages = []; // pages 배열 초기화
  }

  async initialize({ url, cookie }) {
    try {
      const { page, browser } = await initialize({
        url,
        chromiumEngine: this.chromiumEngine,
        page: this.page,
        pages: this.pages,
        browser: this.browser,
        cookie,
      });
      this.page = page;
      this.browser = browser;
    } catch (e) {
      console.error(e.message);
      throw Error("initialize");
    }
  }
}

// const test = new PuppeteerEngine();
// test.initialize({ url: "https://m.naver.com", cookie: "" });
