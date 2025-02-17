import { playNaverShopping } from "../../templetes/naverShopping";
import { measureExecutionTime } from "../../../lib/util/timeStartToEnd";

export async function naverShopping() {
  await measureExecutionTime({ playCallback: playNaverShopping });
}

naverShopping();
