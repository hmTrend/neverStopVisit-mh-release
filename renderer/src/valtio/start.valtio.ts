import { proxy } from "valtio/vanilla";

class StartValtio {
  common: {
    ip: "STATIC" | "TETHERING" | "ROUTER" | "LOCAL";
    memberFid: string;
  };
  nShopping: {
    isStart: boolean;
    selectedGroup: { groupName: string; groupId: string };
    fingerPrint: { groupName: string; groupId: string };
    concurrentBrowserCount: number;
  };

  constructor() {
    this.common = { ip: "STATIC", memberFid: "" };
    this.nShopping = {
      isStart: false,
      selectedGroup: {
        groupName: "",
        groupId: "",
      },
      fingerPrint: {
        groupName: "",
        groupId: "",
      },
      concurrentBrowserCount: 1,
    };
  }
}

export const storeStart = proxy(new StartValtio());
