import { playLogic1 } from "../../organisms/naverShopping/playLogic1";
import { getFingerPrintTargetExcelOne } from "../../molecules/user/getFingerPrintTargetExcelOne";
import { getNShoppingLogic4ExcelAlignFlatTargetOne } from "../../molecules/excel/getFingerPrintTargetExcelOne2";

export async function playNaverShopping({ logicType = "logic1" } = {}) {
  try {
    const { cookieId, cookie } = await getFingerPrintTargetExcelOne({
      groupFid: "673c1ccbdafecfc189ac92ff",
    });
    const excelData = await getNShoppingLogic4ExcelAlignFlatTargetOne();
    await playSelectLogic({ logicType });
  } catch (e) {
    console.error(`playNaverShopping > ${e.message}`);
    throw `playNaverShopping > ${e.message}`;
  }
}

async function playSelectLogic({ logicType }) {
  await naverPlaceLogic1({ logicType });
  naverPlaceLogic2({ logicType });
}

async function naverPlaceLogic1({ logicType }) {
  if (logicType !== "logic1") return;
  await playLogic1();
}

function naverPlaceLogic2({ logicType }) {
  if (logicType !== "logic2") return;
}

// playNaverShopping();
