import { proxy } from "valtio/vanilla";

class NShoppingRegisterValtio {
  selectedGroupName: string;
  groupList: [];
  selectedExcelList: any[];
  getExcelList: any[];
  selectedGroupId: string;

  constructor() {
    this.selectedGroupName = "";
    this.groupList = [];
    this.selectedExcelList = [];
    this.selectedGroupId = "";
    this.getExcelList = [];
  }
}

export const storeNShopping = proxy(new NShoppingRegisterValtio());
