import { proxy } from "valtio/vanilla";

class FingerPrintRegisterValtio {
  groupList: string[];
  selectedGroupId: string;
  selectedGroupName: string;

  constructor() {
    this.groupList = [];
    this.selectedGroupId = "";
    this.selectedGroupName = "";
  }
}

export const storeFingerPrintRegister = proxy(new FingerPrintRegisterValtio());
