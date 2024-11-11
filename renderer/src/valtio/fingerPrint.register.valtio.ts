import { proxy } from "valtio/vanilla";

class FingerPrintRegisterValtio {
  groupList: string[];
  selectGroupFid: string;

  constructor() {
    this.groupList = [];
    this.selectGroupFid = "";
  }
}

export const storeFingerPrintRegister = proxy(new FingerPrintRegisterValtio());
