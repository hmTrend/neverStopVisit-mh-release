import { proxy, subscribe } from "valtio/vanilla";

const STORAGE_KEY = "start_store";

const getInitialData = () => {
  // 기본값 정의
  const defaultData = {
    common: {
      isStart: false,
      ip: "STATIC",
      memberFid: "",
      ipChangeCount: 1,
    },
    nShoppingLogic4: {
      isStart: false,
      selectedGroup: { groupName: "", groupId: "" },
      fingerPrint: { groupName: "", groupId: "" },
      concurrentBrowserCount: 1,
      logicType: "LOGIC1",
    },
    nPlace: {
      isStart: false,
      selectedGroup: { groupName: "", groupId: "" },
      fingerPrint: { groupName: "", groupId: "" },
      concurrentBrowserCount: 1,
      logicType: "NAVER",
    },
  };

  // 클라이언트 사이드에서만 localStorage 접근
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : defaultData;
  }

  return defaultData;
};

class StartValtio {
  common: {
    isStart: boolean;
    ip: "STATIC" | "TETHERING" | "ROUTER" | "LOCAL";
    memberFid: string;
    ipChangeCount: number;
  };
  nShoppingLogic4: {
    isStart: boolean;
    selectedGroup: { groupName: string; groupId: string };
    fingerPrint: { groupName: string; groupId: string };
    concurrentBrowserCount: number;
    logicType: "LOGIC1";
  };
  nPlace: {
    isStart: boolean;
    selectedGroup: { groupName: string; groupId: string };
    fingerPrint: { groupName: string; groupId: string };
    concurrentBrowserCount: number;
    logicType: "NAVER_BLOG" | "GOOGLE_BLOG" | "N_PLACE";
  };

  constructor() {
    const initialData = getInitialData();

    // 상태 초기화
    this.common = initialData.common;
    this.nShoppingLogic4 = initialData.nShoppingLogic4;
    this.nPlace = initialData.nPlace;
  }
}

export const storeStart = proxy(new StartValtio());

if (typeof window !== "undefined") {
  subscribe(storeStart, () => {
    const dataToSave = {
      ...storeStart,
      common: { ...storeStart.common, isStart: false },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  });
}
