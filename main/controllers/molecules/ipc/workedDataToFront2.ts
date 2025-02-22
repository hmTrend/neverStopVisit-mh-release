import { DataUser, dataUserInitialize } from "../../atoms/user/data.user";
import { UtilDate } from "../../atoms/util/util.date";
import { globalMainWindow } from "../../../lib/const/constVar";

interface WorkedDataToFrontMsg {
  mainWindow?: any;
  errorMessage?: string;
  workType?: string;
  groupFid?: string;
  logicType?: string;
  myIp?: string;
  createdAt?: string;
  sendAddress?: string;
  targetKeyword?: string;
  workKeyword?: string;
  totalWorkingTime?: number;
  callback?: any;
  countPatchCallback?: (params: {
    groupFid: string;
    nvMid: string;
    targetKeyword: string;
  }) => Promise<any>;
  nvMid?: string;
}

interface WorkedDataToFrontFunction {
  workedDataToFront: ({ mainWindow, callback, workedData }) => Promise<void>;
  errorMessageTrans: (params: { errMessage: string }) => string;
}

export const workedDataToFront: WorkedDataToFrontFunction["workedDataToFront"] =
  async ({ mainWindow, callback, workedData }) => {
    console.log("workedData 3333");
    console.log(workedData);
    try {
      dataUserInitialize();
      await callback();
      mainWindow.webContents.send(workedData.sendAddress, workedData);
      await workedData.countPatchCallback({
        groupFid: workedData.groupFid,
        nvMid: workedData.nvMid,
        targetKeyword: workedData.targetKeyword,
      });
    } catch (e) {
      mainWindow.webContents.send(workedData.sendAddress, workedData);
      console.error(`workedDataToFront > ${e.message}`);
      throw Error(`workedDataToFront > ${e.message}`);
    }
  };

const errorMessageTrans: WorkedDataToFrontFunction["errorMessageTrans"] = ({
  errMessage,
}) => {
  if (errMessage.includes("#_sr_lst_")) {
    return "상품 미발견";
  }
  if (errMessage.includes("https://nid.naver.com/mobile/user/help/")) {
    return "19세 제한";
  }
  return errMessage;
};
