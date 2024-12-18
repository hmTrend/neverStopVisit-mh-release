import { TetheringMode } from "./network.tethering";
import { changeMacAddress, getMacAddress } from "./network.local";
import { networkRouterEduPlayer } from "./network.router.eduPlayer";
import { networkRouterEdu } from "./network.router.edu.puppeteer";

export const networkIpChange = async ({ common }) => {
  switch (common.ip) {
    case "STATIC":
      console.log("STATIC");
      return;
    case "TETHERING":
      console.log("TETHERING");
      const checkAdbConnectionResult = await TetheringMode.checkAdbConnection();
      if (
        !checkAdbConnectionResult ||
        typeof checkAdbConnectionResult !== "string"
      ) {
        throw new Error("Tethering cannot be changed");
      }
      await TetheringMode.phoneIpChange(checkAdbConnectionResult);
      return;
    case "ROUTER":
      console.log("ROUTER");
      // await networkRouterEduPlayer();
      await networkRouterEdu();
      return;
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
      return;
    default:
      return;
  }
};
