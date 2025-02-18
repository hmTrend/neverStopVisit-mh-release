import { DataUser, dataUserInitialize } from "../../atoms/user/data.user";
import { UtilDate } from "../../atoms/util/util.date";

export async function workedDataToFront({
  targetKeyword,
  mainWindow,
  errorMessage,
  workType,
  logicType,
  myIp,
  createdAt,
  sendAddress = "error-to-front-result",
  callback = "undefined",
}: {
  targetKeyword?: string;
  mainWindow?: any;
  errorMessage?: string;
  workType?: string;
  logicType?: string;
  myIp?: string;
  createdAt?: Date;
  sendAddress?: string;
  callback?: any;
}) {
  try {
    dataUserInitialize();
    await callback();
    mainWindow.webContents.send(sendAddress, {
      workType: DataUser.workType,
      errorMessage: "",
      targetKeyword: DataUser.targetKeyword,
      myIp: DataUser.myIp,
      createdAt: UtilDate.getCurrentDate(),
    });
  } catch (e) {
    mainWindow.webContents.send(sendAddress, {
      workType: DataUser.workType,
      errorMessage: errorMessageTrans({ errMessage: e.message }),
      targetKeyword: DataUser.targetKeyword,
      myIp: DataUser.myIp,
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
  return errMessage;
}
