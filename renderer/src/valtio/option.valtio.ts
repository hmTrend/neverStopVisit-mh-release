import { proxy } from "valtio/vanilla";

class OptionValtio {
  common: { ipChangeType: "STATIC" | "TETHERING" | "ROUTER" | "LOCAL" };

  constructor() {
    this.common = { ipChangeType: "STATIC" };
  }
}

export const storeOptionValtio = proxy(new OptionValtio());
