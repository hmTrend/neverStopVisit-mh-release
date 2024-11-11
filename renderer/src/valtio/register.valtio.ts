import { proxy } from "valtio/vanilla";

class RegisterValtio {
  groupList: string[];

  constructor() {
    this.groupList = [];
  }
}

export const storeRegister = proxy(new RegisterValtio());
