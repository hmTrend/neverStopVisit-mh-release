import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";
import { GetFingerPrintTargetExcelOne } from "../../lib/apollo/finger-print.apollo";
import { cookieNstateSave } from "../commons/PuppeteerEngine/cookieNstateSave";
import {
  GetNPlaceExcelAlignFlatTargetOne,
  GetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber,
  PatchNPlaceDayNowCount,
} from "../../lib/apollo/n-place-apollo";
import { googleToNaver } from "../commons/naver/googleToNaver";
import { errorToFront } from "../commons/error/errorToFront";
import { UtilNetwork } from "../../lib/util/util.network";
import { UtilDate } from "../../lib/util/util.date";
import { logicTypeNAVER } from "./logicType.NAVER";
import { logicTypeGOOGLE } from "./logicType.GOOGLE";
import { logicTypeN_PLACE } from "./logicType.PLACE";
import { apiNotionPatchDayNowCount } from "../../api/notion/api.patchDayNowCount";
import { loggedInCheckWithEmptyPage } from "../commons/naver/loggedInCheckWithEmptyPage";
import { api_notion_errorLog } from "../../api/notion/api.notion.errorLog";
import { globalBrowsers } from "../../lib/const/constVar";

export class NPlace extends PuppeteerEngine {
  async start({ nPlace, mainWindow, continuousWork }): Promise<void> {
    try {
      console.log(1);
      if (continuousWork === 1) {
        globalBrowsers.placeNumbers = [];
      }
      console.log(2);
      for (let i = 0; i <= 5; i++) {
        try {
          var ExcelData;
          {
            console.log(3);
            console.log(globalBrowsers.placeNumbers);
            if (globalBrowsers.placeNumbers.length === 0) {
              console.log("this is globalBrowsers.placeNumbers.length === 0");
              const { data: excelData } =
                await GetNPlaceExcelAlignFlatTargetOne({
                  groupFid: nPlace.selectedGroup.groupId,
                });
              ExcelData = excelData;
            } else {
              console.log("globalBrowsers.placeNumbers 55553433333");
              console.log(globalBrowsers.placeNumbers);
              const { data: excelData } =
                await GetNPlaceExcelAlignFlatTargetOneWithoutPlaceNumber({
                  groupFid: nPlace.selectedGroup.groupId,
                  placeNumber: globalBrowsers.placeNumbers,
                });
              ExcelData = excelData;
            }
          }
          console.log(4);
          const { targetKeyword, targetBlog, placeNumber } = ExcelData;
          {
            this.query = targetKeyword;
            this.nvMid = targetBlog;
            this.placeNumber = placeNumber;
            globalBrowsers.placeNumbers.push(parseInt(placeNumber));
          }
          break;
        } catch (e) {
          await wait(3 * 1000);
          console.error(`123 GetNPlaceExcelAlignFlatTargetOne > ${e.message}`);
          if (e.message.includes("Complete the day's counting tasks")) {
            console.error(`err > NPlace > start > ${e.message}`);
            throw Error(`err > NPlace > start > ${e.message}`);
          }
          if (e.message.includes("No data to import into a continuous work")) {
            globalBrowsers.placeNumbers = [];
            console.error(`err > NPlace > start > ${e.message}`);
            throw Error(`err > NPlace > start > ${e.message}`);
          }
          if (i === 5) {
            throw Error(
              `More than 5 errors > GetNPlaceExcelAlignFlatTargetOne > ${e.message}`,
            );
          }
        }
      }

      for (let i = 0; i <= 5; i++) {
        try {
          const { data: fingerPrintData } = await GetFingerPrintTargetExcelOne({
            groupFid: nPlace.fingerPrint.groupId,
          });

          this.targetCookieId = fingerPrintData._id;
          this.targetCookie = JSON.parse(fingerPrintData.cookie);

          break;
        } catch (e) {
          await wait(3 * 1000);
          console.error(e.message);
          if (i === 3) {
            console.error("More than 3 errors > GetFingerPrintTargetExcelOne");
            throw Error("More than 3 errors > GetFingerPrintTargetExcelOne");
          }
        }
      }
      await super.initialize({
        url:
          nPlace.logicType === "NAVER_BLOG" || nPlace.logicType === "N_PLACE"
            ? "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query="
            : "https://www.google.com/",
        cookie: this.targetCookie,
      });

      {
        if (nPlace.logicType === "GOOGLE_BLOG") {
          const { page } = await googleToNaver({ page: this.page });
          this.page = page;
        }
      }
      {
        await loggedInCheckWithEmptyPage({
          page: this.page,
          _id: this.targetCookieId,
        });
      }
      if (nPlace.logicType === "NAVER_BLOG") {
        await logicTypeNAVER({ ExcelData, pageI: this.page });
      }
      if (nPlace.logicType === "GOOGLE_BLOG") {
        await logicTypeGOOGLE({ ExcelData, pageI: this.page });
      }
      if (nPlace.logicType === "N_PLACE") {
        await logicTypeN_PLACE({ ExcelData, pageI: this.page });
      }
      {
        const { page } = await cookieNstateSave({
          page: this.page,
          _id: this.targetCookieId,
          nState: "정상",
        });
        this.page = page;
      }
      {
        const { data } = await PatchNPlaceDayNowCount({
          placeNumber: Number(this.placeNumber),
          groupFid: ExcelData.groupFid,
        });
        try {
          await apiNotionPatchDayNowCount({ data });
        } catch (e) {
          console.error(e.message);
        }
      }
      const myIp = await UtilNetwork.getIpAddress();
      const createdAt = UtilDate.getCurrentDate();
      errorToFront({
        targetKeyword: this.query,
        mainWindow,
        errorMessage: "",
        workType: "NPlace",
        myIp,
        createdAt,
      });
    } catch (e) {
      const myIp = await UtilNetwork.getIpAddress();
      const createdAt = UtilDate.getCurrentDate();
      errorToFront({
        targetKeyword: this.query,
        mainWindow,
        errorMessage: e.message,
        workType: "NPlace",
        myIp,
        createdAt,
      });
      await api_notion_errorLog({
        data: {
          name: this.query,
          type: "플레이스",
          errorLog: e.message,
          userAgent: this.userAgent,
          logicType:
            nPlace.logicType === "NAVER_BLOG"
              ? "로직1(NAVER_BLOG)"
              : nPlace.logicType === "GOOGLE_BLOG"
                ? "로직2(GOOGLE_BLOG)"
                : nPlace.logicType === "N_PLACE"
                  ? "로직3(N_PLACE)"
                  : "",
        },
      });
      console.error(e.message);
      throw Error(e.message);
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
