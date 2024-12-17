import { proxy } from "valtio/vanilla";

class AuthValtio {
  userId: string;

  constructor() {
    this.userId = "67315a7130d6d4d2bb26e38a";
  }
}

export const storeAuth = proxy(new AuthValtio());
