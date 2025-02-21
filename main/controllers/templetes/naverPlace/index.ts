import { getFingerPrintTargetExcelOne } from "../../molecules/user/getFingerPrintTargetExcelOne";
import { setDataUser } from "../../atoms/user/data.user";
import { getNPlaceExcelAlignFlatTargetOne } from "../../molecules/excel/getNPlaceExcelAlignFlatTargetOne";
import { playLogic1 } from "../../organisms/naverPlace/playLogic1";

interface NPlaceExcelListAlignFlatMapEntity {
  _id: string;
  groupFid: string;
  keyword: string;
  delayTime: number;
  placeName: string;
  placeNumber: string;
  dayCount: number | null;
  totalDayCount: number;
  targetBlog: string;
  targetKeyword: string;
  createdAt: string;
  updatedAt: string;
  __typename: "NPlaceExcelListAlignFlatMapEntity";
}

export async function playNaverPlace({
  logicType = "LOGIC1",
  dataGroupFid = "67909dda7e8fd003562bb4e4",
  fingerPrintGroupFid = "673c1ccbdafecfc189ac92ff",
} = {}) {
  try {
    const { cookie } = await getFingerPrintTargetExcelOne({
      groupFid: fingerPrintGroupFid,
    });
    const excelData: NPlaceExcelListAlignFlatMapEntity =
      await getNPlaceExcelAlignFlatTargetOne({
        groupFid: dataGroupFid,
      });
    const { placeNumber, keyword, delayTime, targetKeyword } = excelData;
    setDataUser({
      targetKeyword: keyword,
      workKeyword: targetKeyword,
      logicType: logicType,
      workType: "NPlace",
      nvMid: placeNumber,
      delayTime,
    });
    await playSelectLogic({
      logicType,
      cookies: cookie,
      placeNumber,
      targetKeyword,
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
  placeNumber,
  targetKeyword,
  delayTime,
}) {
  await naverPlaceLogic1({
    logicType,
    cookies,
    placeNumber,
    targetKeyword,
    delayTime,
  });
  naverPlaceLogic2({ logicType });
}

async function naverPlaceLogic1({
  logicType,
  cookies,
  placeNumber,
  targetKeyword,
  delayTime,
}) {
  if (logicType !== "LOGIC1") return;
  await playLogic1({ cookies, placeNumber, targetKeyword, delayTime });
}

function naverPlaceLogic2({ logicType }) {
  if (logicType !== "LOGIC2") return;
}

// playNaverPlace();
