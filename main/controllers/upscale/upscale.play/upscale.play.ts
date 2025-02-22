import { measureExecutionTime } from "../../../lib/util/timeStartToEnd";
import wait from "waait";
import { internetConnectType } from "../../molecules/commons/internetConnectType";
import { playNaverShopping } from "../../templetes/naverShopping";
import { UtilNetwork } from "../../atoms/util/util.network";
import { monitorNetworkAndStart } from "../../atoms/network/network.local";
import { DataUser, setDataUser } from "../../atoms/user/data.user";
import { PatchNShoppingLogic4NowCountIncrement } from "../../../lib/apollo/n-shoppingLogic4-apollo";
import { apiPatchDayNowCountForShopping } from "../../../api/notion/api.patchDayNowCountForShopping";
import { playNaverPlace } from "../../templetes/naverPlace";
import { workedDataToFront } from "../../molecules/ipc/workedDataToFront2";
import { playDataInitial } from "../../atoms/user/data.play";

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
      await totalPlay({
        playTime,
        nShoppingLogic4,
        nPlace,
        internetType,
        mainWindow,
      });
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
      throw Error(`upscalePlay > isRunning > ${error.message}`);
    }
    await wait(2 * 1000);
  }
}

async function totalPlay({
  internetType,
  playTime,
  nPlace,
  nShoppingLogic4,
  mainWindow,
}) {
  try {
    await networkPlay({ internetType, playTime });
    const allSettledData = await Promise.allSettled(basketPlayList());
    // await measureExecutionTime({
    //   playCallback: () =>
    //     playNaverShopping({
    //       logicType: nShoppingLogic4.logicType,
    //       dataGroupFid: nShoppingLogic4.selectedGroup.groupId,
    //       fingerPrintGroupFid: nShoppingLogic4.fingerPrint.groupId,
    //     }),
    // });
    console.log("allSettledData 33333");
    console.log(allSettledData);
  } catch (e) {
    console.error(`totalPlay > ${e.message}`);
    throw Error(`totalPlay > ${e.message}`);
  }

  function basketPlayList() {
    const savedDataPlay = playDataInitial();
    try {
      const naverShoppingPlayList = async () =>
        await measureExecutionTime({
          playCallback: () =>
            playNaverShopping({
              savedDataPlay,
              logicType: nShoppingLogic4.logicType,
              dataGroupFid: nShoppingLogic4.selectedGroup.groupId,
              fingerPrintGroupFid: nShoppingLogic4.fingerPrint.groupId,
            }),
        });

      const naverPlacePlayList = () =>
        measureExecutionTime({
          playCallback: () =>
            playNaverPlace({
              savedDataPlay,
              logicType: nPlace.logicType,
              dataGroupFid: nPlace.selectedGroup.groupId,
              fingerPrintGroupFid: nPlace.fingerPrint.groupId,
            }),
        });
      let playList = [];
      console.log("nShoppingLogic4 > mainWindow 555555");
      console.log(mainWindow);
      if (nShoppingLogic4.isStart) {
        playList.push(
          workedDataToFront({
            mainWindow,
            callback: naverShoppingPlayList,
            workedData: DataUser,
          }),
        );
      }
      if (nPlace.isStart) {
        playList.push(naverPlacePlayList());
      }
      return playList;
    } catch (e) {
      console.error(e.message);
      throw Error(`basketPlayList > ${e.message}`);
    }
  }
}

let globalExecute = null;
async function networkPlay({ internetType, playTime }) {
  try {
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
  } catch (e) {
    console.error(e.message);
    throw Error(`networkPlay > ${e.message}`);
  }
}

function completedCountList() {
  try {
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
  } catch (e) {
    console.error(e.message);
    throw Error(`completedCountList > ${e.message}`);
  }
}
// upscalePlay();
