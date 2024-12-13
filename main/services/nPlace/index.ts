import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";
import { GetFingerPrintTargetExcelOne } from "../../lib/apollo/finger-print.apollo";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";
import { GetNPlaceExcelAlignFlatTargetOne } from "../../lib/apollo/n-place-apollo";
import { loggedInCheck } from "../commons/naver/loggedInCheck";
import { targetKeywordSearch } from "./targetKeywordSearch";
import { findTargetBlog } from "./findTargetBlog";
import { findTargetPlaceInTargetBlog } from "./findTargetPlaceInTargetBlog";
import { clickNearbyAttractions } from "./clickNearbyAttractions";
import { googleToNaver } from "../commons/naver/googleToNaver";

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
          var EcelData = excelData;
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
        url:
          nPlace.logicType === "NAVER"
            ? "https://www.naver.com/"
            : "https://www.google.com/",
        cookie: this.targetCookie,
      });
      {
        if (nPlace.logicType === "GOOGLE") {
          const { page } = await googleToNaver({ page: this.page });
          this.page = page;
        }
      }
      {
        await loggedInCheck({ page: this.page, _id: this.targetCookieId });
      }
      {
        const { page } = await targetKeywordSearch({
          page: this.page,
          targetKeyword: EcelData.targetKeyword,
        });
        this.page = page;
      }
      {
        const { page } = await findTargetBlog({
          page: this.page,
          targetBlog: EcelData.targetBlog,
        });
        this.page = page;
      }
      {
        const { page } = await findTargetPlaceInTargetBlog({
          page: this.page,
          targetPlace: EcelData.placeNumber,
        });
        this.page = page;
      }
      await wait(EcelData.delayTime * 1000);
      {
        const { page } = await clickNearbyAttractions({ page: this.page });
        this.page = page;
      }
      {
        const { page } = await cookieNstateSave({
          page: this.page,
          _id: this.targetCookieId,
          nState: "정상",
        });
        this.page = page;
        await wait(2000);
        await this.page.context().close();
        await wait(3000);
      }
    } catch (e) {
      const browser = this.page?.context()?.browser();
      console.error(e.message);
      await this.page.close();
      await this.page.context().close();
      if (browser) {
        await browser.close();
      }
      await wait(30 * 1000);
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
