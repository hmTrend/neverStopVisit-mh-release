import { networkRouterEdu } from "./network.router.edu";

export const networkIpChange = async ({ common }) => {
  switch (common.ip) {
    case "STATIC":
      console.log("STATIC");
      return;
    case "TETHERING":
      console.log("TETHERING");
      await networkRouterEdu();
      return;
    case "ROUTER":
      console.log("ROUTER");
      return;
    case "LOCAL":
      console.log("LOCAL");
      return;
    default:
      return;
  }
};
