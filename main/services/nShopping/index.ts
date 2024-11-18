import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import { goToShopping } from "./goToShopping";
import wait from "waait";
import { goToKeyword } from "./goToKeyword";
import { keywordSearch } from "./keywordSearch";
import { sampleCookieNaverLoggedIn } from "./mockData";
import { loggedInCheck } from "../commons/naver/loggedInCheck";
import { CreateNShoppingExcelListAlignFlatMap } from "../../lib/apollo/n-shopping-apollo";
import { GetFingerPrintTargetExcelOne } from "../../lib/apollo/finger-print.apollo";

export class NShopping extends PuppeteerEngine {
  async start({ nShopping }): Promise<void> {
    try {
      const { data: excelData } = await CreateNShoppingExcelListAlignFlatMap({
        groupFid: nShopping.selectedGroup.groupId,
      });
      console.log("excelData 2222");
      console.log(excelData);
      const { data: fingerPrintData } = await GetFingerPrintTargetExcelOne({
        groupFid: nShopping.fingerPrint.groupId,
      });
      await super.initialize({
        url: "https://www.naver.com/",
        cookie: JSON.parse(fingerPrintData.cookie),
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
