import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import { goToShopping } from "./goToShopping";
import wait from "waait";

export class NShopping extends PuppeteerEngine {
  async start(): Promise<void> {
    await super.initialize({ url: "https://www.naver.com/" });
    const { page } = await goToShopping({ page: this.page });
    this.page = page;
  }
}

const xxx = new NShopping();
xxx.start();
