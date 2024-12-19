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
import { isPopup } from "./isPopup";
import { googleToNaver } from "../commons/naver/googleToNaver";
import { errorToFront } from "../commons/error/errorToFront";

export class NShopping extends PuppeteerEngine {
  async start({ nShopping, mainWindow }): Promise<void> {
    try {
      for (let i = 0; i <= 5; i++) {
        try {
          const { data: excelData } = await GetNShoppingExcelAlignFlatTargetOne(
            {
              groupFid: nShopping.selectedGroup.groupId,
            },
          );
          console.log("excelData 334455");
          console.log(excelData);
          var ExcelData = excelData;
          const { query, nvMid } = excelData;
          {
            this.query = query;
            this.nvMid = nvMid;
          }
          break;
        } catch (e) {
          await wait(3 * 1000);
          console.error(e.message);
          if (i === 3) {
            return console.error(
              "More than 3 errors > GetNShoppingExcelAlignFlatTargetOne",
            );
          }
        }
      }
      for (let i = 0; i <= 5; i++) {
        try {
          const { data: fingerPrintData } = await GetFingerPrintTargetExcelOne({
            groupFid: nShopping.fingerPrint.groupId,
          });
          this.targetCookieId = fingerPrintData._id;
          this.targetCookie = JSON.parse(fingerPrintData.cookie);
          break;
        } catch (e) {
          await wait(3 * 1000);
          console.error(e.message);
          if (i === 3) {
            return console.error(
              "More than 3 errors > GetFingerPrintTargetExcelOne",
            );
          }
        }
      }
      await super.initialize({
        url:
          nShopping.logicType === "NAVER"
            ? "https://www.naver.com/"
            : "https://www.google.com/",
        cookie: this.targetCookie,
      });
      {
        if (nShopping.logicType === "GOOGLE") {
          const { page } = await googleToNaver({ page: this.page });
          this.page = page;
        }
      }
      {
        const { page } = await isPopup({
          page: this.page,
        });
        this.page = page;
      }
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
          await wait(20 * 1000); // 찾았을시 20초 대기
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
        this.page = page;
      }
    } catch (e) {
      errorToFront({
        targetKeyword: this.query,
        mainWindow,
        errorMessage: e.message,
        workType: "NShopping",
      });
      console.error(e.message);
    }
  }

  async stop() {
    try {
      await this.page.close();
      await this.page.context().close();
      await this.browser.close();
    } catch (error) {
      await this.page.close();
      await this.page.context().close();
      await this.browser.close();
      console.error("브라우저 종료 중 오류:", error);
    }
  }
}

// const instanceOne = new NShopping();
// Promise.all([instanceOne.start()])
//   .then(() => console.log("Both instances completed"))
//   .catch((error) => console.error("An error occurred:", error));
