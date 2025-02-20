import wait from "waait";
import { GetNPlaceExcelAlignFlatTargetOne } from "../../../lib/apollo/n-place-apollo";

export async function getNPlaceExcelAlignFlatTargetOne({
  groupFid = "67aafd4a7c9b8a9996fa459d",
} = {}) {
  for (let i = 0; i <= 5; i++) {
    try {
      const { data } = await GetNPlaceExcelAlignFlatTargetOne({
        groupFid,
      });
      return data;
    } catch (e) {
      if (i >= 4) {
        throw Error(`getNShoppingLogic4ExcelAlignFlatTargetOne > ${e.message}`);
      }
      console.error(`getNShoppingLogic4ExcelAlignFlatTargetOne > no data`);
      await wait(3 * 1000);
    }
  }
}

// getNPlaceExcelAlignFlatTargetOne();
