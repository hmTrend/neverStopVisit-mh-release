import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import { goToShopping } from "./goToShopping";
import wait from "waait";
import { goToKeyword } from "./goToKeyword";
import { loggedInCheck } from "../commons/naver/loggedInCheck";
import { GetNShoppingExcelAlignFlatTargetOne } from "../../lib/apollo/n-shopping-apollo";
import { GetFingerPrintTargetExcelOne } from "../../lib/apollo/finger-print.apollo";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";
import { plusStoreToComparePricing } from "./plusStoreToComparePricing";
import { searchNVMID } from "./searchNVMID";
import { expandProductDetails } from "./expandProductDetails";
import { makeAPurchase } from "./makeAPurchase";

export class NShopping extends PuppeteerEngine {
  async start({ nShopping }): Promise<void> {
    try {
      const { data: excelData } = await GetNShoppingExcelAlignFlatTargetOne({
        groupFid: nShopping.selectedGroup.groupId,
      });
      const { query, nvMid } = excelData;
      {
        this.query = query;
        this.nvMid = nvMid;
      }
      const { data: fingerPrintData } = await GetFingerPrintTargetExcelOne({
        groupFid: nShopping.fingerPrint.groupId,
      });
      this.targetCookieId = fingerPrintData._id;
      this.targetCookie = JSON.parse(fingerPrintData.cookie);
      await super.initialize({
        url: "https://m.naver.com/",
        cookie: this.targetCookie,
      });
      await loggedInCheck({ page: this.page, _id: this.targetCookieId });
      {
        const { page } = await goToShopping({
          page: this.page,
        });
        this.page = page;
      }
      {
        const { page } = await goToKeyword({
          page: this.page,
          query: this.query,
        });
        this.page = page;
      }
      {
        const { page } = await plusStoreToComparePricing({
          page: this.page,
        });
        this.page = page;
      }
      {
        const { page, isFindNvMid } = await searchNVMID({
          page: this.page,
          nvMid: this.nvMid,
        });
        this.page = page;
        if (isFindNvMid) {
          const { page } = await expandProductDetails({ page: this.page });
          this.page = page;
          {
            const { page } = await makeAPurchase({ page: this.page });
            this.page = page;
          }
        }
      }
      {
        const { page } = await cookieNstateSave({
          page: this.page,
          _id: this.targetCookieId,
          nState: "정상",
        });
        await wait(3000);
        this.page = page;
        await this.page.context().close();
        await wait(3000);
      }
    } catch (e) {
      const browser = await this.page?.context()?.browser();
      console.error(e.message);
      if (browser) {
        await browser.close();
      }
      await wait(10 * 1000);
    }
  }

  async stop() {
    try {
      if (this.page) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (error) {
      console.error("브라우저 종료 중 오류:", error);
    }
  }
}

// const instanceOne = new NShopping();
// Promise.all([instanceOne.start()])
//   .then(() => console.log("Both instances completed"))
//   .catch((error) => console.error("An error occurred:", error));
