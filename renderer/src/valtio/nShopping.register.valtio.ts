import { proxy } from "valtio/vanilla";

class NShoppingRegisterValtio {
  selectedGroupName: string;
  groupList: [];

  constructor() {
    this.selectedGroupName = "";
    this.groupList = [];
  }
}

export const storeNShopping = proxy(new NShoppingRegisterValtio());
