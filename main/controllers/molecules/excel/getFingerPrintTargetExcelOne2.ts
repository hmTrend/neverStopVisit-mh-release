import { GetNShoppingLogic4ExcelAlignFlatTargetOne } from "../../../lib/apollo/n-shoppingLogic4-apollo";
import wait from "waait";

export async function getNShoppingLogic4ExcelAlignFlatTargetOne({
  groupFid = "678069f3613a9e38805be50d",
} = {}) {
  for (let i = 0; i <= 10; i++) {
    try {
      const { data } = await GetNShoppingLogic4ExcelAlignFlatTargetOne({
        groupFid,
      });
      return data;
    } catch (e) {
      if (i >= 9) {
        throw Error(`getNShoppingLogic4ExcelAlignFlatTargetOne > ${e.message}`);
      }
      console.error(`getNShoppingLogic4ExcelAlignFlatTargetOne > no data`);
      await wait(3 * 1000);
    }
  }
}

// getNShoppingLogic4ExcelAlignFlatTargetOne();
