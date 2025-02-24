import { playLogic1 } from "../../organisms/naverShopping/playLogic1";
import { getFingerPrintTargetExcelOne } from "../../molecules/user/getFingerPrintTargetExcelOne";
import { getNShoppingLogic4ExcelAlignFlatTargetOne } from "../../molecules/excel/getFingerPrintTargetExcelOne2";
import { SavedDataPlayFunction } from "../../atoms/user/data.play";

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

export async function playNaverShopping({
  savedDataPlay = undefined,
  logicType = "LOGIC1",
  dataGroupFid = "678069f3613a9e38805be50d",
  fingerPrintGroupFid = "673c1ccbdafecfc189ac92ff",
}: {
  savedDataPlay?: SavedDataPlayFunction;
  logicType?: string;
  dataGroupFid?: string;
  fingerPrintGroupFid?: string;
} = {}) {
  try {
    const { cookie } = await getFingerPrintTargetExcelOne({
      groupFid: fingerPrintGroupFid,
    });
    const excelData: NShoppingLogic4ExcelListAlignFlatMapEntity =
      await getNShoppingLogic4ExcelAlignFlatTargetOne({
        groupFid: dataGroupFid,
      });
    savedDataPlay({
      getShoppingData: {
        cookie,
        ...excelData,
        workType: "NShoppingLogic4",
        logicType,
        dataGroupFid,
        fingerPrintGroupFid,
      },
    });
    const { nvMid, workKeyword, delayTime, targetKeyword } = excelData;
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
  try {
    await naverShoppingLogic1({
      logicType,
      cookies,
      nvMid,
      targetKeyword,
      delayTime,
    });
    naverPlaceLogic2({ logicType });
  } catch (e) {
    console.error(e.message);
    throw Error(`playSelectLogic > ${e.message}`);
  }
}

async function naverShoppingLogic1({
  logicType,
  cookies,
  nvMid,
  targetKeyword,
  delayTime,
}) {
  try {
    if (logicType !== "LOGIC1") return;
    await playLogic1({ cookies, nvMid, targetKeyword, delayTime });
  } catch (e) {
    console.error(e.message);
    throw Error(`naverShoppingLogic1 > ${e.message}`);
  }
}

function naverPlaceLogic2({ logicType }) {
  if (logicType !== "LOGIC2") return;
}

// playNaverShopping();
