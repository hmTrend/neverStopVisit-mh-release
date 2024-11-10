import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import { goToShopping } from "./goToShopping";
import wait from "waait";
import { goToKeyword } from "./goToKeyword";
import { keywordSearch } from "./keywordSearch";
import { sampleCookieNaverLoggedIn } from "./mockData";

export class NShopping extends PuppeteerEngine {
  async start(): Promise<void> {
    try {
      await super.initialize({
        url: "https://www.naver.com/",
        cookie: sampleCookieNaverLoggedIn,
      });
      return;
      const { page: goToShoppingPage } = await goToShopping({
        page: this.page,
      });
      this.page = goToShoppingPage;
      const { page: goToKeywordPage } = await goToKeyword({ page: this.page });
      this.page = goToKeywordPage;
      await keywordSearch({ page: this.page });
    } catch (e) {
      console.error(e.message);
    }
  }
}

const xxx = new NShopping();
xxx.start();
