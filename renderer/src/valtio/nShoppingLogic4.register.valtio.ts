import { proxy } from "valtio/vanilla";

class NShoppingLogic4RegisterValtio {
  selectedGroupName: string;
  groupList: [];
  selectedExcelList: any[];
  selectedGroupId: string;
  getExcelList: any[];
  getExcelListAlignFlat: any[];
  logicType: string[];

  constructor() {
    this.selectedGroupName = "";
    this.groupList = [];
    this.selectedExcelList = [];
    this.selectedGroupId = "";
    this.getExcelList = [];
    this.getExcelListAlignFlat = [];
    this.logicType = ["NAVER", "GOOGLE", "+STORE", "BLOG"];
  }
}

export const storeNShopping = proxy(new NShoppingLogic4RegisterValtio());
