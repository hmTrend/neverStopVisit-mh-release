import { dataUserInitialize } from "../../atoms/user/data.user";

export async function workedDataToFront({
  targetKeyword,
  mainWindow,
  errorMessage,
  workType,
  myIp,
  createdAt,
  sendAddress = "error-to-front-result",
  callback = "undefined",
}: {
  targetKeyword?: string;
  mainWindow?: any;
  errorMessage?: string;
  workType?: string;
  myIp?: string;
  createdAt?: Date;
  sendAddress?: string;
  callback?: any;
}) {
  try {
    dataUserInitialize();
    await callback();
    mainWindow.webContents.send(sendAddress, {
      workType,
      errorMessage,
      targetKeyword,
      myIp,
      createdAt,
    });
  } catch (e) {
    mainWindow.webContents.send(sendAddress, {
      workType,
      errorMessage,
      targetKeyword,
      myIp,
      createdAt,
    });
    console.error(`workedDataToFront > ${e.message}`);
    throw Error(`workedDataToFront > ${e.message}`);
  }
}
