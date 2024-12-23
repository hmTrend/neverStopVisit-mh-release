import { TetheringMode } from "./network.tethering";
import { changeMacAddress, getMacAddress } from "./network.local";
import { networkRouterEdu } from "./network.router.edu.puppeteer";

export const networkIpChange = (() => {
  let nowCount = 0;
  return async ({ common }) => {
    if (nowCount % common.ipChangeCount !== 0) {
      nowCount = nowCount + 1;
      return;
    }
    switch (common.ip) {
      case "STATIC":
        console.log("STATIC");
        return (nowCount = nowCount + 1);
      case "TETHERING":
        console.log("TETHERING");
        const checkAdbConnectionResult =
          await TetheringMode.checkAdbConnection();
        if (
          !checkAdbConnectionResult ||
          typeof checkAdbConnectionResult !== "string"
        ) {
          throw new Error("Tethering cannot be changed");
        }
        await TetheringMode.phoneIpChange(checkAdbConnectionResult);
        return (nowCount = nowCount + 1);
      case "ROUTER":
        console.log("ROUTER");
        // await networkRouterEduPlayer();
        await networkRouterEdu();
        return (nowCount = nowCount + 1);
      case "LOCAL":
        console.log("LOCAL");
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
        return (nowCount = nowCount + 1);
      default:
        return (nowCount = nowCount + 1);
    }
  };
})();
