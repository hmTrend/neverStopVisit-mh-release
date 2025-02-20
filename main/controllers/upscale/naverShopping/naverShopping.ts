import { measureExecutionTime } from "../../../lib/util/timeStartToEnd";
import wait from "waait";
import { internetConnectType } from "../../molecules/commons/internetConnectType";
import { playNaverShopping } from "../../templetes/naverShopping";
import { UtilNetwork } from "../../atoms/util/util.network";
import { monitorNetworkAndStart } from "../../atoms/network/network.local";
import { workedDataToFront } from "../../molecules/ipc/workedDataToFront";
import { DataUser, setDataUser } from "../../atoms/user/data.user";
import { PatchNShoppingLogic4NowCountIncrement } from "../../../lib/apollo/n-shoppingLogic4-apollo";

export async function naverShopping({
  internetType = "STATIC",
  playTime,
  mainWindow,
  data,
}) {
  let isRunning = true;
  while (isRunning) {
    try {
      await workedDataToFront({
        mainWindow,
        groupFid: data.selectedGroup.groupId,
        callback: () => totalPlay({ playTime, data, internetType }),
        countPatchCallback: async ({ groupFid, nvMid, targetKeyword }) =>
          await PatchNShoppingLogic4NowCountIncrement({
            groupFid,
            nvMid,
            targetKeyword,
          }),
      });
    } catch (error) {
      console.error(`naverShopping > ${error.message}`);
      await wait(10 * 1000);
    }
    await wait(2 * 1000);
  }
}

async function totalPlay({ internetType, playTime, data }) {
  try {
    await networkPlay({ internetType, playTime });
    await measureExecutionTime({
      playCallback: () =>
        playNaverShopping({
          logicType: data.logicType,
          dataGroupFid: data.selectedGroup.groupId,
          fingerPrintGroupFid: data.fingerPrint.groupId,
        }),
    });
  } catch (e) {
    console.error(`totalPlay > ${e.message}`);
    throw Error(`totalPlay > ${e.message}`);
  }
}

async function networkPlay({ internetType, playTime }) {
  const execute = await internetConnectType({
    internetType,
    playTime,
  });
  await execute();
  await monitorNetworkAndStart();
  const result = await UtilNetwork.getIpAddress();
  setDataUser({ myIp: result });
  return result;
}

// naverShopping();
