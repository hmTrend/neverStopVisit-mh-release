import { playLogic1 } from "../../organisms/naverShopping/playLogic1";
import { getFingerPrintTargetExcelOne } from "../../molecules/user/getFingerPrintTargetExcelOne";
import { getNShoppingLogic4ExcelAlignFlatTargetOne } from "../../molecules/excel/getFingerPrintTargetExcelOne2";

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
  logicType = "logic1",
  dataGroupFid = "678069f3613a9e38805be50d",
  fingerPrintGroupFid = "673c1ccbdafecfc189ac92ff",
} = {}) {
  try {
    const { cookieId, cookie } = await getFingerPrintTargetExcelOne({
      groupFid: fingerPrintGroupFid,
    });
    const excelData: NShoppingLogic4ExcelListAlignFlatMapEntity =
      await getNShoppingLogic4ExcelAlignFlatTargetOne({
        groupFid: dataGroupFid,
      });
    const { nvMid, workKeyword } = excelData;
    console.log("excelData 3333");
    console.log(excelData);
    await playSelectLogic({
      logicType,
      cookies: cookie,
      nvMid,
      targetKeyword: workKeyword,
    });
  } catch (e) {
    console.error(`playNaverShopping > ${e.message}`);
    throw `playNaverShopping > ${e.message}`;
  }
}

async function playSelectLogic({ logicType, cookies, nvMid, targetKeyword }) {
  await naverPlaceLogic1({ logicType, cookies, nvMid, targetKeyword });
  naverPlaceLogic2({ logicType });
}

async function naverPlaceLogic1({ logicType, cookies, nvMid, targetKeyword }) {
  if (logicType !== "logic1") return;
  await playLogic1({ cookies, nvMid, targetKeyword });
}

function naverPlaceLogic2({ logicType }) {
  if (logicType !== "logic2") return;
}

// playNaverShopping();
