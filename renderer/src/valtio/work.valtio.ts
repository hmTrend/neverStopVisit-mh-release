import { proxy } from "valtio/vanilla";

class WorkValtio {
  completedList: [{ workType: string; errorMessage: string }];
  constructor() {
    this.completedList = [{ workType: "", errorMessage: "" }];
  }
}

export const storeWork = proxy(new WorkValtio());
