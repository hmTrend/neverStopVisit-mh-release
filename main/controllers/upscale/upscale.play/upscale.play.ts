import { measureExecutionTime } from "../../../lib/util/timeStartToEnd";
import wait from "waait";
import { internetConnectType } from "../../molecules/commons/internetConnectType";
import { playNaverShopping } from "../../templetes/naverShopping";
import { UtilNetwork } from "../../atoms/util/util.network";
import { monitorNetworkAndStart } from "../../atoms/network/network.local";
import { workedDataToFront } from "../../molecules/ipc/workedDataToFront";
import { DataUser, setDataUser } from "../../atoms/user/data.user";
import { PatchNShoppingLogic4NowCountIncrement } from "../../../lib/apollo/n-shoppingLogic4-apollo";
import { apiPatchDayNowCountForShopping } from "../../../api/notion/api.patchDayNowCountForShopping";
import { playNaverPlace } from "../../templetes/naverPlace";

export async function upscalePlay({
  internetType = "STATIC",
  playTime,
  mainWindow,
  nShoppingLogic4,
  nPlace,
}) {
  let isRunning = true;

  while (isRunning) {
    try {
      await totalPlay({ playTime, nShoppingLogic4, nPlace, internetType });
      // await workedDataToFront({
      //   mainWindow,
      //   groupFid: nShoppingLogic4.selectedGroup.groupId,
      //   callback: () =>
      //     totalPlay({ playTime, nShoppingLogic4, nPlace, internetType }),
      //   countPatchCallback: async ({ groupFid, nvMid, targetKeyword }) =>
      //     await completedCountList().completedShoppingCountPatch({
      //       groupFid,
      //       nvMid,
      //       targetKeyword,
      //     }),
      // });
    } catch (error) {
      console.error(`naverShopping > ${error.message}`);
      await wait(10 * 1000);
    }
    await wait(2 * 1000);
  }
}

async function totalPlay({ internetType, playTime, nPlace, nShoppingLogic4 }) {
  try {
    await networkPlay({ internetType, playTime });
    const allSettledData = await Promise.allSettled(basketPlayList());
    console.log("allSettledData 33333");
    console.log(allSettledData);
  } catch (e) {
    console.error(`totalPlay > ${e.message}`);
    throw Error(`totalPlay > ${e.message}`);
  }

  function basketPlayList() {
    const naverShoppingPlayList = () =>
      measureExecutionTime({
        playCallback: () =>
          playNaverShopping({
            logicType: nShoppingLogic4.logicType,
            dataGroupFid: nShoppingLogic4.selectedGroup.groupId,
            fingerPrintGroupFid: nShoppingLogic4.fingerPrint.groupId,
          }),
      });
    const naverPlacePlayList = () =>
      measureExecutionTime({
        playCallback: () =>
          playNaverPlace({
            logicType: nPlace.logicType,
            dataGroupFid: nPlace.selectedGroup.groupId,
            fingerPrintGroupFid: nPlace.fingerPrint.groupId,
          }),
      });
    let playList = [];
    console.log("nShoppingLogic4 555555");
    console.log(nShoppingLogic4);
    if (nShoppingLogic4.isStart) {
      playList.push(naverShoppingPlayList());
    }
    if (nPlace.isStart) {
      playList.push(naverPlacePlayList());
    }
    return playList;
  }
}

let globalExecute = null;
async function networkPlay({ internetType, playTime }) {
  if (!globalExecute) {
    globalExecute = await internetConnectType({
      internetType,
      playTime,
    });
  }
  await globalExecute();
  await monitorNetworkAndStart();
  const result = await UtilNetwork.getIpAddress();
  setDataUser({ myIp: result });
  return result;
}

function completedCountList() {
  const completedShoppingCountPatch = async ({
    groupFid,
    nvMid,
    targetKeyword,
  }) => {
    const { data } = await PatchNShoppingLogic4NowCountIncrement({
      groupFid,
      nvMid,
      targetKeyword,
    });
    await apiPatchDayNowCountForShopping({ data });
  };
  return { completedShoppingCountPatch };
}
// upscalePlay();
