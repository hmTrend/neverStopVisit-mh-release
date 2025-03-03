import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";
import { GetNShoppingExcelAlignFlatTargetOne } from "../../lib/apollo/n-shopping-apollo";
import { GetFingerPrintTargetExcelOne } from "../../lib/apollo/finger-print.apollo";
import { errorToFront } from "../commons/error/errorToFront";
import { UtilNetwork } from "../../lib/util/util.network";
import { UtilDate } from "../../lib/util/util.date";
import { logicTypeNAVER } from "./logicType-NAVER";
import { logicTypeGOOGLE } from "./logicType-GOOGLE";
import { logicTypePLUSSTORE } from "./logicType-PLUS-STORE";
import { DataUser } from "../../controllers/atoms/user/data.user";

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
      if (nShopping.logicType === "NAVER") {
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
      if (nShopping.logicType === "GOOGLE") {
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
      if (nShopping.logicType === "+STORE") {
        await super.initialize({
          url: "https://www.google.com/",
          cookie: this.targetCookie,
        });
        console.log("로직3");
        await logicTypePLUSSTORE({
          getRandomTime,
          page: this.page,
          targetCookieId: this.targetCookieId,
          nvMid: this.nvMid,
          query: this.query,
        });
      }
      const myIp = await UtilNetwork.getIpAddress();
      const createdAt = UtilDate.getCurrentDate();
      errorToFront({
        ...DataUser,
        targetKeyword: this.query,
        mainWindow,
        errorMessage: "",
        workType: "NShopping",
        myIp,
        createdAt,
      });
    } catch (e) {
      const myIp = await UtilNetwork.getIpAddress();
      const createdAt = UtilDate.getCurrentDate();
      errorToFront({
        ...DataUser,
        targetKeyword: this.query,
        mainWindow,
        errorMessage: e.message,
        workType: "NShopping",
        myIp,
        createdAt,
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
