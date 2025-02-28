import { GetFingerPrintTargetExcelOne } from "../../../lib/apollo/finger-print.apollo";
import wait from "waait";

export async function getFingerPrintTargetExcelOne({
  groupFid = "673c1ccbdafecfc189ac92ff",
  workedListOne = "abc",
} = {}) {
  for (let i = 0; i <= 10; i++) {
    try {
      const { data } = await GetFingerPrintTargetExcelOne({
        groupFid,
        workedListOne,
      });
      return { cookieId: data._id, cookie: JSON.parse(data.cookie) };
    } catch (e) {
      if (i >= 10) {
        throw Error(
          `getFingerPrintTargetExcelOne with Shopping > ${e.message}`,
        );
      }
      console.error(`getFingerPrintTargetExcelOne with Shopping > no data`);
      await wait(3 * 1000);
    }
  }
}

// getFingerPrintTargetExcelOne();
