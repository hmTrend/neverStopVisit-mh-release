import { measureExecutionTime } from "../../../lib/util/timeStartToEnd";
import wait from "waait";
import { internetConnectType } from "../../molecules/commons/internetConnectType";
import { playNaverShopping } from "../../templetes/naverShopping";
import { UtilNetwork } from "../../atoms/util/util.network";

export async function naverShopping({ internetType = "STATIC" }) {
  let isRunning = true;
  while (isRunning) {
    try {
      await networkPlay({ internetType });
      await measureExecutionTime({
        playCallback: playNaverShopping,
      });
    } catch (error) {
      console.error(`naverShopping > ${error.message}`);
      await wait(10 * 1000);
    }
    await wait(1000);
  }
}

async function networkPlay({ internetType }) {
  const execute = await internetConnectType({
    internetType,
    playTime: 3,
  });
  await execute();
  return await UtilNetwork.getIpAddress();
}

// naverShopping();
