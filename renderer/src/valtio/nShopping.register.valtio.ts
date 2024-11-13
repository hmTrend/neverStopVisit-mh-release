import { proxy } from "valtio/vanilla";

class NShoppingRegisterValtio {
  selectedGroupName: string;
  groupList: [];
  selectedExcelList: [];

  constructor() {
    this.selectedGroupName = "";
    this.groupList = [];
    this.selectedExcelList = [];
  }
}

export const storeNShopping = proxy(new NShoppingRegisterValtio());
