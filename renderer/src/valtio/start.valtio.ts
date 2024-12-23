import { proxy, subscribe } from "valtio/vanilla";
import { IpChangeCount } from "@/components/start/IpChangeCount";

const STORAGE_KEY = "start_store";

const getInitialData = () => {
  // 기본값 정의
  const defaultData = {
    common: { isStart: false, ip: "STATIC", memberFid: "", ipChangeCount: 1 },
    nShopping: {
      isStart: false,
      selectedGroup: { groupName: "", groupId: "" },
      fingerPrint: { groupName: "", groupId: "" },
      concurrentBrowserCount: 1,
      logicType: "NAVER",
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
  nShopping: {
    isStart: boolean;
    selectedGroup: { groupName: string; groupId: string };
    fingerPrint: { groupName: string; groupId: string };
    concurrentBrowserCount: number;
    logicType: "NAVER" | "GOOGLE";
  };
  nPlace: {
    isStart: boolean;
    selectedGroup: { groupName: string; groupId: string };
    fingerPrint: { groupName: string; groupId: string };
    concurrentBrowserCount: number;
    logicType: "NAVER" | "GOOGLE";
  };

  constructor() {
    const initialData = getInitialData();

    // 상태 초기화
    this.common = initialData.common;
    this.nShopping = initialData.nShopping;
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
