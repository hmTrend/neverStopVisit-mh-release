import { proxy } from "valtio/vanilla";

class StartValtio {
  common: { memberFid: string; networkConnectType: string };
  nShopping: {
    selectedGroup: { groupName: string; groupId: string };
    fingerPrint: { groupName: string; groupId: string };
    concurrentBrowserCount: number;
  };

  constructor() {
    this.common = {};
    this.nShopping = {
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
