import { playNaverShopping } from "../../templetes/naverShopping";
import { measureExecutionTime } from "../../../lib/util/timeStartToEnd";
import wait from "waait";

export async function naverShopping() {
  let isRunning = true;
  while (isRunning) {
    try {
      await measureExecutionTime({ playCallback: playNaverShopping });
    } catch (error) {
      console.error(`naverShopping > ${error.message}`);
      await wait(10 * 1000);
    }
    await wait(1000);
  }
}

naverShopping();
