import * as Puppeteer from "puppeteer";
import { initialize } from "./initialize";

export class PuppeteerEngine {
  browser: Puppeteer.Browser;
  page: Puppeteer.Page;
  pages: Puppeteer.Page[];

  async initialize() {
    await initialize({
      url: "https://www.naver.com/",
      puppeteer: Puppeteer,
      browser: this.browser,
      page: this.page,
      pages: this.pages,
    });
  }
}
