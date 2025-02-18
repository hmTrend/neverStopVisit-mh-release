import { GetFingerPrintTargetExcelOne } from "../../../lib/apollo/finger-print.apollo";

export async function getFingerPrintTargetExcelOne({
  groupFid = "673c1ccbdafecfc189ac92ff",
} = {}) {
  try {
    const { data } = await GetFingerPrintTargetExcelOne({
      groupFid,
    });
    return { cookieId: data._id, cookie: JSON.parse(data.cookie) };
  } catch (e) {
    console.error(`getFingerPrintTargetExcelOne > ${e.message}`);
    throw Error(`getFingerPrintTargetExcelOne > ${e.message}`);
  }
}

// getFingerPrintTargetExcelOne();
