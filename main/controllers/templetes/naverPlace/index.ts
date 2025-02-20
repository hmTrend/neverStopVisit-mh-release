import { playLogic1 } from "../../organisms/naverShopping/playLogic1";
import { getFingerPrintTargetExcelOne } from "../../molecules/user/getFingerPrintTargetExcelOne";
import { getNShoppingLogic4ExcelAlignFlatTargetOne } from "../../molecules/excel/getFingerPrintTargetExcelOne2";
import { setDataUser } from "../../atoms/user/data.user";

interface NShoppingLogic4ExcelListAlignFlatMapEntity {
  _id: string;
  groupFid: string;
  targetKeyword: string;
  delayTime: number;
  nvMidList: string;
  nvMid: string;
  nowCount: number;
  dayCount: number;
  workKeyword: string;
  targetBlog: string;
  createdAt: string;
  updatedAt: string;
  __typename: "NShoppingLogic4ExcelListAlignFlatMapEntity";
}

export async function playNaverPlace({
  logicType = "LOGIC1",
  dataGroupFid = "678069f3613a9e38805be50d",
  fingerPrintGroupFid = "673c1ccbdafecfc189ac92ff",
} = {}) {
  try {
    const { cookie } = await getFingerPrintTargetExcelOne({
      groupFid: fingerPrintGroupFid,
    });
    const excelData: NShoppingLogic4ExcelListAlignFlatMapEntity =
      await getNShoppingLogic4ExcelAlignFlatTargetOne({
        groupFid: dataGroupFid,
      });
    const { nvMid, workKeyword, delayTime, targetKeyword } = excelData;
    setDataUser({
      targetKeyword,
      workKeyword,
      logicType: logicType,
      workType: "NShoppingLogic4",
      nvMid,
      delayTime,
    });
    console.log("excelData 3333");
    console.log(excelData);
    await playSelectLogic({
      logicType,
      cookies: cookie,
      nvMid,
      targetKeyword: workKeyword,
      delayTime,
    });
  } catch (e) {
    console.error(`playNaverShopping > ${e.message}`);
    throw Error(`playNaverShopping > ${e.message}`);
  }
}

async function playSelectLogic({
  logicType,
  cookies,
  nvMid,
  targetKeyword,
  delayTime,
}) {
  await naverPlaceLogic1({
    logicType,
    cookies,
    nvMid,
    targetKeyword,
    delayTime,
  });
  naverPlaceLogic2({ logicType });
}

async function naverPlaceLogic1({
  logicType,
  cookies,
  nvMid,
  targetKeyword,
  delayTime,
}) {
  if (logicType !== "LOGIC1") return;
  await playLogic1({ cookies, nvMid, targetKeyword, delayTime });
}

function naverPlaceLogic2({ logicType }) {
  if (logicType !== "LOGIC2") return;
}

// playNaverShopping();
