export const DataUser = {
  targetKeyword: "",
  mainWindow: undefined,
  errorMessage: "",
  workType: "",
  myIp: "",
  nvMid: "",
  delayTime: 0,
  totalWorkingTime: 0,
  createdAt: new Date(),
  sendAddress: "error-to-front-result",
  callback: "undefined",
};

export function dataUserInitialize() {
  // 각 속성을 개별적으로 업데이트
  DataUser.targetKeyword = "";
  DataUser.mainWindow = undefined;
  DataUser.errorMessage = "";
  DataUser.workType = "";
  DataUser.myIp = "";
  DataUser.nvMid = "";
  DataUser.delayTime = 0;
  DataUser.totalWorkingTime = 0;
  DataUser.createdAt = new Date();
  DataUser.sendAddress = "error-to-front-result";
  DataUser.callback = "undefined";
}

export function setDataUser({
  targetKeyword,
  mainWindow,
  errorMessage,
  workType,
  myIp,
  nvMid,
  delayTime,
  totalWorkingTime,
}: {
  targetKeyword?: string;
  mainWindow?: undefined;
  errorMessage?: string;
  workType?: string;
  myIp?: string;
  nvMid?: string;
  delayTime?: number;
  totalWorkingTime?: number;
}) {
  // 각 속성을 개별적으로 업데이트
  if (targetKeyword !== undefined) DataUser.targetKeyword = targetKeyword;
  if (mainWindow !== undefined) DataUser.mainWindow = mainWindow;
  if (errorMessage !== undefined) DataUser.errorMessage = errorMessage;
  if (workType !== undefined) DataUser.workType = workType;
  if (myIp !== undefined) DataUser.myIp = myIp;
  if (nvMid !== undefined) DataUser.nvMid = nvMid;
  if (delayTime !== undefined) DataUser.delayTime = delayTime;
  if (totalWorkingTime !== undefined)
    DataUser.totalWorkingTime = totalWorkingTime;
  DataUser.createdAt = new Date();
  DataUser.sendAddress = "error-to-front-result";
  DataUser.callback = "undefined";
}
