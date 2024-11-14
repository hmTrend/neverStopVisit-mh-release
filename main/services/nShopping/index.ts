import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import { goToShopping } from "./goToShopping";
import wait from "waait";
import { goToKeyword } from "./goToKeyword";
import { keywordSearch } from "./keywordSearch";
import { sampleCookieNaverLoggedIn } from "./mockData";
import { loggedInCheck } from "../commons/naver/loggedInCheck";

export class NShopping extends PuppeteerEngine {
  async start(): Promise<void> {
    try {
      await super.initialize({
        url: "https://www.naver.com/",
        cookie: sampleCookieNaverLoggedIn,
      });
      await loggedInCheck({ page: this.page });
      {
        const { page } = await goToShopping({
          page: this.page,
        });
        this.page = page;
      }
      {
        const { page } = await goToKeyword({
          page: this.page,
        });
        this.page = page;
      }
      await keywordSearch({ page: this.page });
    } catch (e) {
      console.error(e.message);
    }
  }
}

// const instanceOne = new NShopping();
// Promise.all([instanceOne.start()])
//   .then(() => console.log("Both instances completed"))
//   .catch((error) => console.error("An error occurred:", error));
