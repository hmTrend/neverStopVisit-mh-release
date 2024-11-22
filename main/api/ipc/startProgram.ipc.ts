import { ipcMain } from "electron";
import { NShopping } from "../../services/nShopping";
import { networkIpChange } from "../../services/commons/network";
import { monitorNetworkAndStart } from "../../services/commons/network/network.local";
import wait from "waait";

export const startProgramIpc = () => {
  let currentNShoppingInstance = null;

  ipcMain.handle("start-program", async (event, args) => {
    const data = JSON.parse(args);
    const { nShopping, common } = data;

    await executeInChunks(
      10000,
      100,
      nShopping,
      currentNShoppingInstance,
      common,
    );

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

async function executeInChunks(
  totalCount = 10000,
  chunkSize = 100,
  nShopping,
  currentNShoppingInstance,
  common,
) {
  try {
    const totalChunks = Math.ceil(totalCount / chunkSize);
    let completedCount = 0;

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
        await networkIpChange({ common });
        await monitorNetworkAndStart();
        let startProgramList = [];
        currentNShoppingInstance = new NShopping();
        if (nShopping.isStart) {
          startProgramList.push(currentNShoppingInstance.start({ nShopping }));
        }
        const result = await Promise.all([...startProgramList]);
        completedCount++;

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
}
