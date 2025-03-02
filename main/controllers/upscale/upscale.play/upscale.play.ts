import wait from "waait";
import { internetConnectType } from "../../molecules/commons/internetConnectType";
import { playNaverShopping } from "../../templetes/naverShopping";
import { UtilNetwork } from "../../atoms/util/util.network";
import { monitorNetworkAndStart } from "../../atoms/network/network.local";
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
import { PatchNPlaceDayNowCount } from "../../../lib/apollo/n-place-apollo";
import { apiNotionPatchDayNowCount } from "../../../api/notion/api.patchDayNowCount";
import { UtilAnalisys } from "../../atoms/util/util.analisys";
import { withLogging } from "../../atoms/util/util.logger";

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
    const networkPlayWithLogging = withLogging(networkPlay, "networkPlay");
    const resultChangeSeconds = await UtilAnalisys.measureExecutionTime({
      playCallback: async () =>
        networkPlayWithLogging({
          internetType,
          playTime,
          savedDataPlayCB: savedDataPlay,
        }),
    });
    savedDataPlay({
      getShoppingData: { changeTime: resultChangeSeconds },
      getPlaceData: { changeTime: resultChangeSeconds },
    });
    const allSettledData = await Promise.allSettled(basketPlayList());
    const allSettledResultWithLogging = withLogging(
      allSettledResult,
      "allSettledResult",
    );
    await allSettledResultWithLogging(
      allSettledData,
      nShoppingLogic4,
      savedDataPlay,
    );
  } catch (e) {
    console.error(`totalPlay > ${e.message}`);
    throw Error(`totalPlay > ${e.message}`);
  }

  function basketPlayList() {
    const savedDataPlay_mainWindow = withLogging(
      savedDataPlay,
      "savedDataPlay_mainWindow",
    );
    savedDataPlay_mainWindow({ getMainWindow: mainWindow });
    try {
      const naverShoppingPlayList = async () => {
        const resultTotalWorkedSecondsTime =
          await UtilAnalisys.measureExecutionTime({
            playCallback: () =>
              playNaverShopping({
                savedDataPlay,
                logicType: nShoppingLogic4.logicType,
                dataGroupFid: nShoppingLogic4.selectedGroup.groupId,
                fingerPrintGroupFid: nShoppingLogic4.fingerPrint.groupId,
              }),
          });
        const savedDataPlay_totalWorkingTime = withLogging(
          savedDataPlay,
          "savedDataPlay_totalWorkingTime",
        );
        await savedDataPlay_totalWorkingTime({
          getShoppingData: {
            ["totalWorkingTime"]: resultTotalWorkedSecondsTime,
          },
        });
      };

      const naverPlacePlayList = async () => {
        const resultTotalWorkedSecondsTime =
          await UtilAnalisys.measureExecutionTime({
            playCallback: () =>
              playNaverPlace({
                savedDataPlay,
                logicType: nPlace.logicType,
                dataGroupFid: nPlace.selectedGroup.groupId,
                fingerPrintGroupFid: nPlace.fingerPrint.groupId,
              }),
          });
        savedDataPlay({
          getPlaceData: { totalWorkingTime: resultTotalWorkedSecondsTime },
        });
      };

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
    const { getCurrentIndex } = await nShoppingLogic4IsStart({
      nShoppingLogic4,
      allSettledData,
      mainWindow,
      currentIndex,
      savedDataPlay,
    });
    currentIndex = getCurrentIndex;
    await nPlaceIsStart({
      nPlace,
      allSettledData,
      mainWindow,
      currentIndex,
      savedDataPlay,
    });
  }
}

async function nShoppingLogic4IsStart({
  nShoppingLogic4,
  savedDataPlay,
  allSettledData,
  mainWindow,
  currentIndex,
}) {
  if (!nShoppingLogic4.isStart) return { getCurrentIndex: 0 };
  const { shoppingData } = savedDataPlay({});
  const shoppingResult = allSettledData[currentIndex];
  if (shoppingResult.status === "fulfilled") {
    const workedDataToFrontWithLogging = withLogging(
      workedDataToFront,
      "workedDataToFront",
    );
    await workedDataToFrontWithLogging({
      savedData: {
        ...nShoppingLogic4,
        ...shoppingData,
        createdAt: UtilDate.getCurrentDate(),
        errorMessage: "",
      },
      mainWindow,
    });
  } else if (shoppingResult.status === "rejected") {
    const workedDataToFrontWithLogging = withLogging(
      workedDataToFront,
      "workedDataToFront",
    );
    await workedDataToFrontWithLogging({
      savedData: {
        ...nShoppingLogic4,
        ...shoppingData,
        createdAt: UtilDate.getCurrentDate(),
        errorMessage: UtilText.errorMessageTrans({
          errMessage: shoppingResult.reason.message,
        }),
      },
      mainWindow,
    });
  }
  const PatchNShoppingLogic4NowCountIncrementWithLogging = withLogging(
    PatchNShoppingLogic4NowCountIncrement,
    "PatchNShoppingLogic4NowCountIncrement",
  );
  const { data } = await PatchNShoppingLogic4NowCountIncrementWithLogging({
    groupFid: shoppingData.dataGroupFid,
    nvMid: shoppingData.nvMid,
    targetKeyword: shoppingData.targetKeyword,
  });
  const apiPatchDayNowCountForShoppingWithLogging = withLogging(
    apiPatchDayNowCountForShopping,
    "apiPatchDayNowCountForShopping",
  );
  await apiPatchDayNowCountForShoppingWithLogging({ data });
  currentIndex++;
  return { getCurrentIndex: currentIndex };
}

async function nPlaceIsStart({
  nPlace,
  savedDataPlay,
  allSettledData,
  mainWindow,
  currentIndex,
}) {
  if (!nPlace.isStart) return;
  const { placeData } = savedDataPlay({});
  const placeResult = allSettledData[currentIndex];
  if (placeResult.status === "fulfilled") {
    await workedDataToFront({
      savedData: {
        ...nPlace,
        ...placeData,
        createdAt: UtilDate.getCurrentDate(),
        errorMessage: "",
      },
      mainWindow,
    });
  } else if (placeResult.status === "rejected") {
    console.error(`nPlaceIsStart > ${placeResult.reason}`);
    await workedDataToFront({
      savedData: {
        ...nPlace,
        ...placeData,
        createdAt: UtilDate.getCurrentDate(),
        errorMessage: UtilText.errorMessageTrans(placeResult.reason),
      },
      mainWindow,
    });
  }
  const { data } = await PatchNPlaceDayNowCount({
    groupFid: placeData.dataGroupFid,
    placeNumber: parseInt(placeData.placeNumber),
  });
  await apiNotionPatchDayNowCount({ data });
  currentIndex++;
  return { getCurrentIndex: currentIndex };
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
// upscalePlay();
