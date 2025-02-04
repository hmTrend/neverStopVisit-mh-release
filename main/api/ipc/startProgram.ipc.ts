import { ipcMain } from "electron";
import { NShopping } from "../../services/nShopping";
import { networkIpChange } from "../../services/commons/network";
import { monitorNetworkAndStart } from "../../services/commons/network/network.local";
import { NPlace } from "../../services/nPlace";
import { closeAllBrowsers } from "../../services/commons/PuppeteerEngine/BrowserManager";
import wait from "waait";
import { NShoppingLogic4 } from "../../services/nShoppingLogic4";

export const startProgramIpc = ({ mainWindow }) => {
  let currentNShoppingLogic4Instance = null;
  let currentNShoppingInstance = null;
  let currentNPlaceInstance = null;

  ipcMain.handle("start-program", async (event, args) => {
    const data = JSON.parse(args);
    const { nShopping, common, nPlace, nShoppingLogic4 } = data;
    await executeInChunks({
      totalCount: 10000,
      chunkSize: 100,
      nPlace,
      nShopping,
      nShoppingLogic4,
      common,
      mainWindow,
      currentNShoppingLogic4Instance,
      currentNShoppingInstance,
      currentNPlaceInstance,
    });
    return { message: "OK" };
  });

  ipcMain.handle("stop-program", async () => {
    try {
      if (currentNShoppingInstance) {
        await currentNShoppingInstance.stop();
        currentNShoppingInstance = null;
      }
      return { message: "프로그램이 중지되었습니다." };
    } catch (error) {
      console.error("프로그램 중지 중 오류:", error);
      throw error;
    }
  });
};

async function executeInChunks({
  totalCount = 10000,
  chunkSize = 100,
  nPlace,
  nShopping,
  currentNShoppingLogic4Instance,
  currentNShoppingInstance,
  currentNPlaceInstance,
  common,
  mainWindow,
  nShoppingLogic4,
}) {
  try {
    const totalChunks = Math.ceil(totalCount / chunkSize);
    let completedCount = 0;
    let continuousWork: number = 1;
    let placeNumbers: number[] = [];

    for (let chunk = 0; chunk < totalChunks; chunk++) {
      // 현재 청크의 시작과 끝 계산
      const start = chunk * chunkSize;
      const end = Math.min(start + chunkSize, totalCount);
      const currentChunkSize = end - start;

      console.log(
        `\n청크 ${chunk + 1}/${totalChunks} 시작 (${start + 1} ~ ${end})`,
      );

      // 현재 청크 실행

      for (let i = 0; i < currentChunkSize; i++) {
        let startProgramList = [];
        if (continuousWork === 1) {
          await networkIpChange({ common });

          await monitorNetworkAndStart();
          currentNShoppingLogic4Instance = new NShoppingLogic4();
          currentNShoppingInstance = new NShopping();
          currentNPlaceInstance = new NPlace();
        }
        try {
          if (nShoppingLogic4.isStart) {
            console.log("this is nShoppingLogic4");
            startProgramList.push(
              currentNShoppingLogic4Instance.start({
                nShoppingLogic4,
                mainWindow,
                continuousWork,
              }),
            );
          }
          if (nShopping.isStart) {
            startProgramList.push(
              currentNShoppingInstance.start({ nShopping, mainWindow }),
            );
          }
          if (nPlace.isStart) {
            startProgramList.push(
              currentNPlaceInstance.start({
                nPlace,
                mainWindow,
                continuousWork,
              }),
            );
          }
          const result = await Promise.all([...startProgramList]);
          completedCount++;
          await wait(3000);
          const nowCount = nowCountSetup(continuousWork, common.ipChangeCount);
          continuousWork = nowCount;
          if (continuousWork === 1) {
            await closeAllBrowsers();
          }
          await wait(5000);
        } catch (e) {
          console.log("e.message >>>>>> test3333");
          console.log(e.message);
          if (
            e.message.includes(
              "More than 5 errors > GetNPlaceExcelAlignFlatTargetOne",
            )
          ) {
            console.error(
              "this is More than 3 errors > GetNPlaceExcelAlignFlatTargetOne",
            );
            await wait(300 * 1000);
          }
          if (e.message.includes("Complete the day's counting tasks")) {
            console.error("Complete the day's counting tasks > waiting 300s..");
            await wait(300 * 1000);
          }
          if (e.message.includes("No data to import into a continuous work")) {
            continuousWork = 1;
            console.error(
              "No data to import into a continuous work > waiting 3s..",
            );
            await wait(3 * 1000);
          }
          await closeAllBrowsers();
          await wait(20 * 1000);
          console.error(e.message);
        }

        // 진행상황 로깅 (10%마다)
        if (completedCount % Math.ceil(chunkSize / 10) === 0) {
          console.log(
            `진행률: ${completedCount}/${totalCount} (${((completedCount / totalCount) * 100).toFixed(1)}%)`,
          );
        }
      }

      // 청크 완료 후 잠시 대기 (선택사항)
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    console.log("\n모든 실행이 완료되었습니다.");
  } catch (error) {
    console.error("실행 중 오류 발생:", error);
  }

  function nowCountSetup(nowCount, maxCount) {
    console.log("maxCount 33333");
    console.log(maxCount);
    console.log("nowCount 33333333333");
    console.log(nowCount);
    if (nowCount < maxCount) {
      nowCount = nowCount + 1;
      return nowCount;
    }
    return 1;
  }
}
