import { measureExecutionTime } from "../../../lib/util/timeStartToEnd";
import wait from "waait";
import { internetConnectType } from "../../molecules/commons/internetConnectType";

export async function naverShopping() {
  let isRunning = true;
  while (isRunning) {
    try {
      await measureExecutionTime({ playCallback: internetPlay });
    } catch (error) {
      console.error(`naverShopping > ${error.message}`);
      await wait(10 * 1000);
    }
    await wait(1000);
  }
}

async function internetPlay() {
  const execute = await internetConnectType({
    internetType: "STATIC",
    callback: naverShopping,
    playTime: 3,
  });
  await execute();
}

// naverShopping();
