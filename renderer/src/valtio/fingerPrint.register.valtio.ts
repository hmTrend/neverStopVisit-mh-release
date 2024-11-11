import { proxy } from "valtio/vanilla";

class FingerPrintRegisterValtio {
  groupList: string[];
  selectedGroupId: string;
  selectedGroupName: string;
  selectedExcelList: any[];

  constructor() {
    this.groupList = [];
    this.selectedGroupId = "";
    this.selectedGroupName = "";
    this.selectedExcelList = [];
  }
}

export const storeFingerPrintRegister = proxy(new FingerPrintRegisterValtio());
