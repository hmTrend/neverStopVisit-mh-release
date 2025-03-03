import { GetNShoppingLogic4ExcelAlignFlatTargetOne } from "../../../lib/apollo/n-shoppingLogic4-apollo";
import wait from "waait";

export async function getNShoppingLogic4ExcelAlignFlatTargetOne({
  groupFid = "67c17e02a7ac17d1aa9cbad4",
} = {}) {
  for (let i = 0; i <= 10; i++) {
    try {
      const { data } = await GetNShoppingLogic4ExcelAlignFlatTargetOne({
        groupFid,
      });
      console.log(data);
      return data;
    } catch (e) {
      console.log("e.message 33333");
      console.log(e.message);
      if (e.message.includes("Complete the day's counting tasks")) {
        throw Error(`getNShoppingLogic4ExcelAlignFlatTargetOne > ${e.message}`);
      }
      if (i >= 9) {
        throw Error(`getNShoppingLogic4ExcelAlignFlatTargetOne > ${e.message}`);
      }
      console.error(`getNShoppingLogic4ExcelAlignFlatTargetOne > no data`);
      await wait(3 * 1000);
    }
  }
}

// getNShoppingLogic4ExcelAlignFlatTargetOne();
