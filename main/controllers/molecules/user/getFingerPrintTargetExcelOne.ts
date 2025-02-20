import { GetFingerPrintTargetExcelOne } from "../../../lib/apollo/finger-print.apollo";
import wait from "waait";

export async function getFingerPrintTargetExcelOne({
  groupFid = "673c1ccbdafecfc189ac92ff",
} = {}) {
  for (let i = 0; i <= 5; i++) {
    try {
      const { data } = await GetFingerPrintTargetExcelOne({
        groupFid,
      });
      return { cookieId: data._id, cookie: JSON.parse(data.cookie) };
    } catch (e) {
      if (i >= 4) {
        throw Error(`getFingerPrintTargetExcelOne > ${e.message}`);
      }
      console.error(`getFingerPrintTargetExcelOne > no data`);
      await wait(3 * 1000);
    }
  }
}

// getFingerPrintTargetExcelOne();
