import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";
import { GetFingerPrintTargetExcelOne } from "../../lib/apollo/finger-print.apollo";
import { errorToFront } from "../commons/error/errorToFront";
import { UtilNetwork } from "../../lib/util/util.network";
import { UtilDate } from "../../lib/util/util.date";
import { logicTypeNAVER } from "./logicType-NAVER";
import { logicTypeGOOGLE } from "./logicType-GOOGLE";
import { logicTypePLUSSTORE } from "./logicType-PLUS-STORE";
import {
  GetNShoppingLogic4ExcelAlignFlatTargetOne,
  PatchNShoppingLogic4NowCountIncrement,
} from "../../lib/apollo/n-shoppingLogic4-apollo";
import { logicTypeBLOG } from "./logicType-BLOG";
import { logicTypeNAVER_COMPARE } from "./logicType-NAVER_COMPARE";
import { logicTypeN_SHOPPING_TAB } from "./logicType-N_SHOPPING_TAB";
import { apiPatchDayNowCountForShopping } from "../../api/notion/api.patchDayNowCountForShopping";
import { api_notion_shopping_errorLog } from "../../api/notion/api.notion.shopping.errorLog";

export class NShoppingLogic4 extends PuppeteerEngine {
  async start({ nShoppingLogic4, mainWindow }): Promise<void> {
    try {
      for (let i = 0; i <= 5; i++) {
        try {
          console.log("getNShoppingLogic4ExcelAlignFlatTargetOne 3333");
          const { data: excelData } =
            await GetNShoppingLogic4ExcelAlignFlatTargetOne({
              groupFid: nShoppingLogic4.selectedGroup.groupId,
            });
          var ExcelData = excelData;
          const { workKeyword, nvMid, targetBlog, targetKeyword } = excelData;
          {
            this.query = workKeyword;
            this.nvMid = nvMid;
            this.targetBlog = targetBlog;
            this.targetKeyword = targetKeyword;
          }
          break;
        } catch (e) {
          console.error(e.message);
          if (e.message.includes("Complete the day's counting tasks")) {
            console.error(`err > NShoppingLogic4 > start > ${e.message}`);
            throw Error(`err > NShoppingLogic4 > start > ${e.message}`);
          }
          await wait(3 * 1000);
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
            groupFid: nShoppingLogic4.fingerPrint.groupId,
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
      if (nShoppingLogic4.logicType === "NAVER") {
        await super.initialize({
          url: "https://www.naver.com/",
          cookie: this.targetCookie,
        });
        await logicTypeNAVER({
          getRandomTime,
          page: this.page,
          targetCookieId: this.targetCookieId,
          nvMid: this.nvMid,
          query: this.query,
        });
      }
      if (nShoppingLogic4.logicType === "GOOGLE") {
        await super.initialize({
          url: "https://www.google.com/",
          cookie: this.targetCookie,
        });
        await logicTypeGOOGLE({
          getRandomTime,
          page: this.page,
          targetCookieId: this.targetCookieId,
          nvMid: this.nvMid,
          query: this.query,
        });
      }
      if (nShoppingLogic4.logicType === "+STORE") {
        await super.initialize({
          url: "https://www.google.com/",
          cookie: this.targetCookie,
        });
        console.log("logic 3");
        await logicTypePLUSSTORE({
          getRandomTime,
          page: this.page,
          targetCookieId: this.targetCookieId,
          nvMid: this.nvMid,
          query: this.query,
        });
      }
      if (nShoppingLogic4.logicType === "BLOG") {
        await super.initialize({
          url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
          cookie: this.targetCookie,
        });
        console.log("logic 4");
        await logicTypeBLOG({
          getRandomTime,
          page: this.page,
          targetCookieId: this.targetCookieId,
          query: this.query,
          targetBlog: this.targetBlog,
        });
      }
      if (nShoppingLogic4.logicType === "NAVER_COMPARE") {
        await super.initialize({
          url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
          cookie: this.targetCookie,
        });
        console.log("logic 5");
        await logicTypeNAVER_COMPARE({
          getRandomTime,
          page: this.page,
          targetCookieId: this.targetCookieId,
          query: this.query,
          nvMid: this.nvMid,
        });
      }
      if (nShoppingLogic4.logicType === "N_SHOPPING_TAB") {
        await super.initialize({
          url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=",
          cookie: this.targetCookie,
        });
        console.log("logic 6");
        await logicTypeN_SHOPPING_TAB({
          getRandomTime,
          page: this.page,
          targetCookieId: this.targetCookieId,
          query: this.query,
          nvMid: this.nvMid,
        });
      }
      const myIp = await UtilNetwork.getIpAddress();
      const createdAt = UtilDate.getCurrentDate();
      errorToFront({
        targetKeyword: this.query,
        mainWindow,
        errorMessage: "",
        workType: "NShoppingLogic4",
        myIp,
        createdAt,
      });
      const { data } = await PatchNShoppingLogic4NowCountIncrement({
        groupFid: nShoppingLogic4.selectedGroup.groupId,
        nvMid: this.nvMid,
        targetKeyword: this.targetKeyword,
      });
      try {
        await apiPatchDayNowCountForShopping({ data });
      } catch (e) {
        console.error(e.message);
      }
    } catch (e) {
      const myIp = await UtilNetwork.getIpAddress();
      const createdAt = UtilDate.getCurrentDate();
      errorToFront({
        targetKeyword: this.query,
        mainWindow,
        errorMessage: e.message,
        workType: "NShoppingLogic4",
        myIp,
        createdAt,
      });
      await api_notion_shopping_errorLog({
        data: {
          name: this.query,
          type: "쇼핑",
          errorLog: e.message,
          userAgent: this.userAgent,
          logicType:
            nShoppingLogic4.logicType === "NAVER"
              ? "로직1(NAVER)"
              : nShoppingLogic4.logicType === "GOOGLE"
                ? "로직2(GOOGLE)"
                : nShoppingLogic4.logicType === "+STORE"
                  ? "로직3(+STORE)"
                  : nShoppingLogic4.logicType === "BLOG"
                    ? "로직4(BLOG)"
                    : nShoppingLogic4.logicType === "NAVER_COMPARE"
                      ? "로직5(NAVER_COMPARE)"
                      : nShoppingLogic4.logicType === "N_SHOPPING_TAB"
                        ? "로직6(N_SHOPPING_TAB)"
                        : "",
        },
      });
      console.error(e.message);
      throw Error(e.message);
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

function getRandomTime() {
  // 20초(20000ms)에서 30초(30000ms) 사이의 랜덤 시간 생성
  const randomMs = Math.floor(Math.random() * (30000 - 20000 + 1)) + 20000;

  // 밀리초를 초로 변환
  const randomSeconds = randomMs / 1000;

  return randomSeconds;
}

// const instanceOne = new NShopping();
// Promise.all([instanceOne.start()])
//   .then(() => console.log("Both instances completed"))
//   .catch((error) => console.error("An error occurred:", error));
