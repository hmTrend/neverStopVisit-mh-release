import { initialize } from "./initialize";
import { Browser, Page, BrowserContext } from "playwright";
import { chromium } from "playwright-extra";
import { initializeForPC } from "./initializeForPC";
import { globalBrowsers } from "../../../lib/const/constVar";

export class PuppeteerEngine {
  chromiumEngine: typeof chromium; // 'typeof chromium'으로 수정
  page: Page;
  pages: Page[];
  browser: Browser;
  targetCookie: any;
  targetCookieId: string;
  query: string;
  nvMid: string;
  targetBlog: string;
  context: BrowserContext;
  placeNumber: number;
  targetKeyword: string;

  constructor() {
    this.chromiumEngine = chromium; // chromium 초기화
    this.pages = []; // pages 배열 초기화
  }

  async initialize({ url, cookie, type = "" }) {
    try {
      const { page, browser } = await initialize({
        url,
        chromiumEngine: this.chromiumEngine,
        page: this.page,
        pages: this.pages,
        browser: this.browser,
        cookie,
        type,
      });
      this.page = page;
      this.browser = browser;
      globalBrowsers.browsers.push(browser);
    } catch (e) {
      console.error(e.message);
      throw Error(`initialize > ${e.message}`);
    }
  }

  async initializeForPC({ url, cookie, type = "", fingerPrintNetworkType }) {
    try {
      const { page, browser } = await initializeForPC({
        url,
        chromiumEngine: this.chromiumEngine,
        page: this.page,
        pages: this.pages,
        browser: this.browser,
        cookie,
        type,
        fingerPrintNetworkType,
      });
      console.log("aaa");
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
