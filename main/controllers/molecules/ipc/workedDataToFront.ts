import { DataUser, dataUserInitialize } from "../../atoms/user/data.user";
import { UtilDate } from "../../atoms/util/util.date";

export async function workedDataToFront({
  mainWindow,
  groupFid,
  errorMessage,
  workType,
  logicType,
  myIp,
  createdAt,
  sendAddress = "error-to-front-result",
  callback = "undefined",
  countPatchCallback = async () => {},
}: {
  mainWindow?: any;
  errorMessage?: string;
  workType?: string;
  groupFid?: string;
  logicType?: string;
  myIp?: string;
  createdAt?: Date;
  sendAddress?: string;
  callback?: any;
  countPatchCallback?: ({ groupFid, nvMid, targetKeyword }) => Promise<any>;
}) {
  try {
    dataUserInitialize();
    await callback();
    mainWindow.webContents.send(sendAddress, {
      workType: DataUser.workType,
      logicType: DataUser.logicType,
      errorMessage: "",
      targetKeyword: DataUser.targetKeyword,
      workKeyword: DataUser.workKeyword,
      myIp: DataUser.myIp,
      totalWorkingTime: DataUser.totalWorkingTime,
      createdAt: UtilDate.getCurrentDate(),
    });
    await countPatchCallback({
      groupFid,
      nvMid: DataUser.nvMid,
      targetKeyword: DataUser.targetKeyword,
    });
  } catch (e) {
    mainWindow.webContents.send(sendAddress, {
      workType: DataUser.workType,
      logicType: DataUser.logicType,
      errorMessage: errorMessageTrans({ errMessage: e.message }),
      targetKeyword: DataUser.targetKeyword,
      workKeyword: DataUser.workKeyword,
      myIp: DataUser.myIp,
      totalWorkingTime: DataUser.totalWorkingTime,
      createdAt: UtilDate.getCurrentDate(),
    });
    console.error(`workedDataToFront > ${e.message}`);
    throw Error(`workedDataToFront > ${e.message}`);
  }
}

function errorMessageTrans({ errMessage }: { errMessage: string }) {
  if (errMessage.includes("#_sr_lst_")) {
    return "상품 미발견";
  }
  if (errMessage.includes("https://nid.naver.com/mobile/user/help/")) {
    return "19세 제한";
  }
  return errMessage;
}
