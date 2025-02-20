export const DataUser = {
  targetKeyword: "",
  workKeyword: "",
  mainWindow: undefined,
  errorMessage: "",
  workType: "",
  logicType: "",
  myIp: "",
  nvMid: "",
  delayTime: 0,
  totalWorkingTime: 0,
  createdAt: new Date(),
  sendAddress: "error-to-front-result",
  callback: "undefined",
  groupFid: "undefined",
};

export function dataUserInitialize() {
  // 각 속성을 개별적으로 업데이트
  DataUser.targetKeyword = "";
  DataUser.workKeyword = "";
  DataUser.mainWindow = undefined;
  DataUser.errorMessage = "";
  DataUser.workType = "";
  DataUser.logicType = "";
  DataUser.myIp = "";
  DataUser.nvMid = "";
  DataUser.delayTime = 0;
  DataUser.totalWorkingTime = 0;
  DataUser.createdAt = new Date();
  DataUser.sendAddress = "error-to-front-result";
  DataUser.callback = "undefined";
  DataUser.groupFid = "";
}

export function setDataUser({
  targetKeyword,
  workKeyword,
  mainWindow,
  errorMessage,
  workType,
  logicType,
  myIp,
  nvMid,
  delayTime,
  totalWorkingTime,
  groupFid,
}: {
  targetKeyword?: string;
  workKeyword?: string;
  mainWindow?: undefined;
  errorMessage?: string;
  workType?: string;
  logicType?: string;
  myIp?: string;
  nvMid?: string;
  delayTime?: number;
  totalWorkingTime?: number;
  groupFid?: string;
}) {
  // 각 속성을 개별적으로 업데이트
  if (targetKeyword !== undefined) DataUser.targetKeyword = targetKeyword;
  if (workKeyword !== undefined) DataUser.workKeyword = workKeyword;
  if (mainWindow !== undefined) DataUser.mainWindow = mainWindow;
  if (errorMessage !== undefined) DataUser.errorMessage = errorMessage;
  if (workType !== undefined) DataUser.workType = workType;
  if (logicType !== undefined) DataUser.logicType = logicType;
  if (myIp !== undefined) DataUser.myIp = myIp;
  if (nvMid !== undefined) DataUser.nvMid = nvMid;
  if (delayTime !== undefined) DataUser.delayTime = delayTime;
  if (groupFid !== undefined) DataUser.groupFid = groupFid;
  if (totalWorkingTime !== undefined)
    DataUser.totalWorkingTime = totalWorkingTime;
  DataUser.createdAt = new Date();
  DataUser.sendAddress = "error-to-front-result";
  DataUser.callback = "undefined";
}
