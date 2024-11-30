import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";
import { GetFingerPrintTargetExcelOne } from "../../lib/apollo/finger-print.apollo";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";
import { GetNPlaceExcelAlignFlatTargetOne } from "../../lib/apollo/n-place-apollo";
import { loggedInCheck } from "../commons/naver/loggedInCheck";
import { googleToNaver } from "./googleToNaver";
import { targetKeywordSearch } from "./targetKeywordSearch";

export class NPlace extends PuppeteerEngine {
  async start({ nPlace }): Promise<void> {
    try {
      for (let i = 0; i <= 5; i++) {
        try {
          const { data: excelData } = await GetNPlaceExcelAlignFlatTargetOne({
            groupFid: nPlace.selectedGroup.groupId,
          });
          console.log("excelData 334455");
          console.log(excelData);
          const { targetKeyword, targetBlog, placeNumber } = excelData;
          {
            this.query = targetKeyword;
            this.nvMid = targetBlog;
            this.placeNumber = placeNumber;
          }
          break;
        } catch (e) {
          await wait(3 * 1000);
          console.error(e.message);
          if (i === 3) {
            return console.error(
              "More than 3 errors > GetNPlaceExcelAlignFlatTargetOne",
            );
          }
        }
      }
      for (let i = 0; i <= 5; i++) {
        try {
          const { data: fingerPrintData } = await GetFingerPrintTargetExcelOne({
            groupFid: nPlace.fingerPrint.groupId,
          });
          console.log(fingerPrintData);
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
        url: "https://www.google.com/",
        cookie: this.targetCookie,
      });
      {
        const { page } = await googleToNaver({ page: this.page });
        this.page = page;
      }
      {
        const { page } = await targetKeywordSearch({
          page: this.page,
          targetKeyword: "수분크림",
        });
        this.page = page;
      }
      await wait(1000 * 1000);
      {
        await loggedInCheck({ page: this.page, _id: this.targetCookieId });
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
