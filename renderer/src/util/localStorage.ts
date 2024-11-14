// utils/localStorage.ts
import { storeStart } from "@/valtio/start.valtio";

const STORAGE_KEY = "nShopping";
const STORAGE_KEY2 = "common";

export const nShoppingStorage = {
  saveState: (state: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  loadState: () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return {
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
    return JSON.parse(saved);
  },

  updateField: (field: string, value: any) => {
    const currentState = nShoppingStorage.loadState();
    const newState = {
      ...currentState,
      [field]: value,
    };
    nShoppingStorage.saveState(newState);
    return newState;
  },

  syncToValtio: () => {
    const savedState = nShoppingStorage.loadState();
    // storeStart의 nShopping에 저장된 상태 적용
    storeStart.nShopping = {
      ...savedState, // localStorage 값으로 덮어쓰기
    };
    return savedState;
  },
};

export const commonStorage = {
  saveState: (state: any) => {
    localStorage.setItem(STORAGE_KEY2, JSON.stringify(state));
  },

  loadState: () => {
    const saved = localStorage.getItem(STORAGE_KEY2);
    if (!saved) {
      return {
        ip: "STATIC",
        memberFid: "",
      };
    }
    return JSON.parse(saved);
  },

  updateField: (field: string, value: any) => {
    const currentState = commonStorage.loadState();
    const newState = {
      ...currentState,
      [field]: value,
    };
    commonStorage.saveState(newState);
    return newState;
  },

  syncToValtio: () => {
    const savedState = commonStorage.loadState();
    storeStart.common = {
      ...savedState,
    };
    return savedState;
  },
};
