import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import { goToShopping } from "./goToShopping";
import wait from "waait";
import { goToKeyword } from "./goToKeyword";
import { keywordSearch } from "./keywordSearch";

export class NShopping extends PuppeteerEngine {
  async start(): Promise<void> {
    await super.initialize({ url: "https://www.naver.com/" });
    const { page: goToShoppingPage } = await goToShopping({ page: this.page });
    this.page = goToShoppingPage;
    const { page: goToKeywordPage } = await goToKeyword({ page: this.page });
    this.page = goToKeywordPage;
    await keywordSearch({ page: this.page });
  }
}

const xxx = new NShopping();
xxx.start();
