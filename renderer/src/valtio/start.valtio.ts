import { proxy } from "valtio/vanilla";

class StartValtio {
  selectProgram: any;

  constructor() {
    this.selectProgram = [];
  }
}

export const storeStart = proxy(new StartValtio());
