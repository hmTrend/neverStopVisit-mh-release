import { proxy } from "valtio/vanilla";

class FingerPrintRegisterValtio {
  groupList: string[];
  selectedGroupId: string;
  selectedGroupName: string;
  selectedExcelList: any[];
  getExcelList: any[];
  listTotalCount: number;
  fingerPrintNetworkType: "LOCAL" | "YOODOOPROXY";

  constructor() {
    this.groupList = [];
    this.selectedGroupId = "";
    this.selectedGroupName = "";
    this.selectedExcelList = [];
    this.getExcelList = [];
    this.listTotalCount = 0;
    this.fingerPrintNetworkType = "YOODOOPROXY";
  }
}

export const storeFingerPrintRegister = proxy(new FingerPrintRegisterValtio());
