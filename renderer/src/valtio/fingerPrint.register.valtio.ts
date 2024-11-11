import { proxy } from "valtio/vanilla";

class FingerPrintRegisterValtio {
  groupList: string[];
  selectedGroupId: string;
  selectedGroupName: string;
  selectedExcelList: any[];
  getExcelList: any[];

  constructor() {
    this.groupList = [];
    this.selectedGroupId = "";
    this.selectedGroupName = "";
    this.selectedExcelList = [];
    this.getExcelList = [];
  }
}

export const storeFingerPrintRegister = proxy(new FingerPrintRegisterValtio());
