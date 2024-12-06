import { proxy } from "valtio/vanilla";

class FingerPrintRegisterValtio {
  groupList: string[];
  selectedGroupId: string;
  selectedGroupName: string;
  selectedExcelList: any[];
  getExcelList: any[];
  listTotalCount: number;

  constructor() {
    this.groupList = [];
    this.selectedGroupId = "";
    this.selectedGroupName = "";
    this.selectedExcelList = [];
    this.getExcelList = [];
    this.listTotalCount = 0;
  }
}

export const storeFingerPrintRegister = proxy(new FingerPrintRegisterValtio());
