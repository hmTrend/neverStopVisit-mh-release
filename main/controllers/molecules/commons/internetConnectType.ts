import { TetheringMode } from "../../atoms/network/network.tethering";
import { networkRouterEdu } from "../../atoms/network/network.router.edu.puppeteer";
import {
  changeMacAddress,
  getMacAddress,
} from "../../atoms/network/network.local";
import { UtilNetwork } from "../../atoms/util/util.network";

export async function internetConnectType({
  internetType = "STATIC",
  playTime = 5,
}) {
  let count = 0;
  console.log("playTime");
  console.log(playTime);
  console.log(internetType);
  return async function execute() {
    if (count % playTime === 0) {
      internetTypeSTATIC({ internetType });
      await internetTypeTETHERING({ internetType });
      await internetTypeROUTER({ internetType });
      await internetTypeLOCAL({ internetType });
    }
    count++;
  };
}

function internetTypeSTATIC({ internetType }) {
  if (internetType !== "STATIC") return;
}

async function internetTypeTETHERING({ internetType }) {
  if (internetType !== "TETHERING") return;
  const checkAdbConnectionResult = await TetheringMode.checkAdbConnection();
  if (
    !checkAdbConnectionResult ||
    typeof checkAdbConnectionResult !== "string"
  ) {
    throw new Error("internetTypeTETHERING > Tethering cannot be changed");
  }
  await TetheringMode.phoneIpChange(checkAdbConnectionResult);
}

async function internetTypeROUTER({ internetType }) {
  if (internetType !== "ROUTER") return;
  await networkRouterEdu();
}

async function internetTypeLOCAL({ internetType }) {
  if (internetType !== "LOCAL") return;
  for (let i = 0; i < 5; i++) {
    try {
      const GetMacAddress = await getMacAddress();
      await changeMacAddress({
        nowMacAddress: GetMacAddress,
        networkAdapterName: "이더넷",
      });
      break;
    } catch (e) {
      console.error(e.message);
      if (i >= 4) {
        throw Error("ERR > macAddress is not changed");
      }
    }
  }
}
