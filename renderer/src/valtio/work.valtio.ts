import { proxy } from "valtio/vanilla";

class WorkValtio {
  completedList: any[];
  constructor() {
    this.completedList = [];
  }
}

export const storeWork = proxy(new WorkValtio());
