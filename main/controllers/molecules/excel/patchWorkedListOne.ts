import { PatchWorkedListOne } from "../../../lib/apollo/n-shoppingLogic4-apollo";
import wait from "waait";

export async function patchWorkedListOne({
  _id = "678069f3613a9e38805be50d",
  workedName = "abc",
} = {}) {
  for (let i = 0; i <= 5; i++) {
    try {
      const { data } = await PatchWorkedListOne({
        _id,
        workedName,
      });
      return data;
    } catch (e) {
      if (i >= 4) {
        throw Error(`patchWorkedListOne > ${e.message}`);
      }
      console.error(`patchWorkedListOne > no data`);
      await wait(3 * 1000);
    }
  }
}

// getNShoppingLogic4ExcelAlignFlatTargetOne();
