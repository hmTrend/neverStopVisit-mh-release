import { proxy } from "valtio/vanilla";

class StartValtio {
  common: {
    isStart: boolean;
    ip: "STATIC" | "TETHERING" | "ROUTER" | "LOCAL";
    memberFid: string;
  };
  nShopping: {
    isStart: boolean;
    selectedGroup: { groupName: string; groupId: string };
    fingerPrint: { groupName: string; groupId: string };
    concurrentBrowserCount: number;
  };
  nPlace: {
    isStart: boolean;
    selectedGroup: { groupName: string; groupId: string };
    fingerPrint: { groupName: string; groupId: string };
    concurrentBrowserCount: number;
  };

  constructor() {
    this.common = { isStart: false, ip: "STATIC", memberFid: "" };
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
    this.nPlace = {
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
