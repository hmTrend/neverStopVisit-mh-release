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
import {
  playDataInitial,
  SavedDataPlayFunction,
} from "../../atoms/user/data.play";
import { UtilText } from "../../atoms/util/util.text";
import { UtilDate } from "../../atoms/util/util.date";

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
      const savedDataPlay = playDataInitial();
      await totalPlay({
        playTime,
        nShoppingLogic4,
        nPlace,
        internetType,
        mainWindow,
        savedDataPlay,
      });
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
  savedDataPlay,
}) {
  try {
    await networkPlay({
      internetType,
      playTime,
      savedDataPlayCB: savedDataPlay,
    });
    const allSettledData = await Promise.allSettled(basketPlayList());
    console.log("allSettledData 33333");
    console.log(allSettledData);
    await allSettledResult(allSettledData, nShoppingLogic4, savedDataPlay);
  } catch (e) {
    console.error(`totalPlay > ${e.message}`);
    throw Error(`totalPlay > ${e.message}`);
  }

  function basketPlayList() {
    savedDataPlay({ getMainWindow: mainWindow });
    try {
      const naverShoppingPlayList = async () => {
        const resultTotalWorkedSecondsTime = await measureExecutionTime({
          playCallback: () =>
            playNaverShopping({
              savedDataPlay,
              logicType: nShoppingLogic4.logicType,
              dataGroupFid: nShoppingLogic4.selectedGroup.groupId,
              fingerPrintGroupFid: nShoppingLogic4.fingerPrint.groupId,
            }),
        });
        savedDataPlay({
          getShoppingData: { totalWorkingTime: resultTotalWorkedSecondsTime },
        });
      };

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
      if (nShoppingLogic4.isStart) {
        playList.push(naverShoppingPlayList());
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

  async function allSettledResult(
    allSettledData,
    nShoppingLogic4,
    savedDataPlay: SavedDataPlayFunction,
  ) {
    let currentIndex = 0;
    if (nShoppingLogic4.isStart) {
      const { shoppingData } = savedDataPlay({});
      const shoppingResult = allSettledData[currentIndex];
      if (shoppingResult.status === "fulfilled") {
        await workedDataToFront({
          savedData: {
            ...nShoppingLogic4,
            ...shoppingData,
            createdAt: UtilDate.getCurrentDate(),
            errorMessage: "",
          },
          mainWindow,
        });
      } else if (shoppingResult.status === "rejected") {
        console.error("쇼핑 로직 에러:", shoppingResult.reason);
        await workedDataToFront({
          savedData: {
            ...nShoppingLogic4,
            ...shoppingData,
            createdAt: UtilDate.getCurrentDate(),
            errorMessage: UtilText.errorMessageTrans(shoppingResult.reason),
          },
          mainWindow,
        });
      }
      await PatchNShoppingLogic4NowCountIncrement({
        groupFid: shoppingData.groupFid,
        nvMid: shoppingData.nvMid,
        targetKeyword: shoppingData.targetKeyword,
      });
      currentIndex++;
    }
    if (nPlace.isStart) {
      // const placeResult = allSettledData[currentIndex];
      // if (placeResult.status === "fulfilled") {
      //   // 플레이스 로직 성공 처리
      //   nextPlaceFunction();
      // } else if (placeResult.status === "rejected") {
      //   // 플레이스 로직 실패 처리
      //   console.error("플레이스 로직 에러:", placeResult.reason);
      //   // 또는 에러 처리 함수 호출
      //   handlePlaceError(placeResult.reason);
      // }
    }
  }
}

let globalExecute = null;
async function networkPlay({
  internetType,
  playTime,
  savedDataPlayCB = ({ getShoppingData, getPlaceData }) => {},
}) {
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
    savedDataPlayCB({
      getShoppingData: { myIp: result },
      getPlaceData: { myIp: result },
    });
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
