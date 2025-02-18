import { GetFingerPrintTargetExcelOne } from "../../../lib/apollo/finger-print.apollo";
import { GetNShoppingLogic4ExcelAlignFlatTargetOne } from "../../../lib/apollo/n-shoppingLogic4-apollo";

export async function getNShoppingLogic4ExcelAlignFlatTargetOne({
  groupFid = "678069f3613a9e38805be50d",
} = {}) {
  try {
    const { data } = await GetNShoppingLogic4ExcelAlignFlatTargetOne({
      groupFid,
    });
    return data;
  } catch (e) {
    console.error(`getNShoppingLogic4ExcelAlignFlatTargetOne > ${e.message}`);
    throw Error(`getNShoppingLogic4ExcelAlignFlatTargetOne > ${e.message}`);
  }
}

// getNShoppingLogic4ExcelAlignFlatTargetOne();
