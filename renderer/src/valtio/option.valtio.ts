import { proxy } from "valtio/vanilla";

class OptionValtio {
  common: { ipChangeType: "STATIC" | "TETHERING" | "ROUTER" | "LOCAL" };
  multiCount: any[];

  constructor() {
    this.common = { ipChangeType: "STATIC" };
    this.multiCount = [
      { title: "쇼핑", count: 1 },
      { title: "플레이스", count: 1 },
      { title: "쿠팡", count: 1 },
    ];
  }
}

export const storeOption = proxy(new OptionValtio());
