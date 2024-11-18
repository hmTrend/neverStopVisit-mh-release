import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import { goToShopping } from "./goToShopping";
import wait from "waait";
import { goToKeyword } from "./goToKeyword";
import { keywordSearch } from "./keywordSearch";
import { loggedInCheck } from "../commons/naver/loggedInCheck";
import { CreateNShoppingExcelListAlignFlatMap } from "../../lib/apollo/n-shopping-apollo";
import { GetFingerPrintTargetExcelOne } from "../../lib/apollo/finger-print.apollo";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";

export class NShopping extends PuppeteerEngine {
  async start({ nShopping }): Promise<void> {
    try {
      const { data: excelData } = await CreateNShoppingExcelListAlignFlatMap({
        groupFid: nShopping.selectedGroup.groupId,
      });
      console.log("excelData 2222");
      console.log(excelData);
      const { query } = excelData;
      {
        this.query = query;
      }

      const { data: fingerPrintData } = await GetFingerPrintTargetExcelOne({
        groupFid: nShopping.fingerPrint.groupId,
      });
      this.targetCookieId = fingerPrintData._id;
      await super.initialize({
        url: "https://www.naver.com/",
        cookie: this.targetCookie,
      });
      // await loggedInCheck({ page: this.page, _id: this.targetCookieId });
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
      await keywordSearch({ page: this.page });
      // await cookieNstateSave({ page, _id, nState: "미로그인" });
    } catch (e) {
      console.error(e.message);
    }
  }
}

// const instanceOne = new NShopping();
// Promise.all([instanceOne.start()])
//   .then(() => console.log("Both instances completed"))
//   .catch((error) => console.error("An error occurred:", error));
