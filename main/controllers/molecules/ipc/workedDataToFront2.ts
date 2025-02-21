import { DataUser, dataUserInitialize } from "../../atoms/user/data.user";
import { UtilDate } from "../../atoms/util/util.date";

interface WorkedDataToFrontMsg {
  mainWindow?: {
    webContents: {
      send: (address: string, data: any) => void;
    };
  };
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
  callback?: () => Promise<void>;
  countPatchCallback?: (params: {
    groupFid: string;
    nvMid: string;
    targetKeyword: string;
  }) => Promise<any>;
  nvMid?: string;
}

interface WorkedDataToFrontFunction {
  workedDataToFront: (workedData?: WorkedDataToFrontMsg) => Promise<void>;
  errorMessageTrans: (params: { errMessage: string }) => string;
}

export const workedDataToFront: WorkedDataToFrontFunction["workedDataToFront"] =
  async (workedData) => {
    try {
      dataUserInitialize();
      await workedData.callback();
      workedData.mainWindow.webContents.send(
        workedData.sendAddress,
        workedData,
      );
      await workedData.countPatchCallback({
        groupFid: workedData.groupFid,
        nvMid: workedData.nvMid,
        targetKeyword: workedData.targetKeyword,
      });
    } catch (e) {
      workedData.mainWindow.webContents.send(
        workedData.sendAddress,
        workedData,
      );
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
