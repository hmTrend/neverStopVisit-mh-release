import { proxy } from "valtio/vanilla";

class AuthValtio {
  userId: boolean;

  constructor() {
    this.userId = false;
  }
}

export const storeAuth = proxy(new AuthValtio());
