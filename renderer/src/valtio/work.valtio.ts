import { proxy } from "valtio/vanilla";

class WorkValtio {
  completedList: any[];
  constructor() {
    this.completedList = [];
  }
  addToCompletedList(item: any) {
    if (!item) return;
    this.completedList = [...this.completedList, item].slice(-100);
  }
}

export const storeWork = proxy(new WorkValtio());
