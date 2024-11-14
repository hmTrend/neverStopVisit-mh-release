// utils/localStorage.ts
const STORAGE_KEY = "nShopping";

export const nShoppingStorage = {
  // 전체 상태 저장
  saveState: (state: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  // 전체 상태 불러오기
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

  // 특정 필드만 업데이트
  updateField: (field: string, value: any) => {
    const currentState = nShoppingStorage.loadState();
    const newState = {
      ...currentState,
      [field]: value,
    };
    nShoppingStorage.saveState(newState);
    return newState;
  },
};
