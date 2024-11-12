import { proxy } from "valtio/vanilla";

class MemberValtio {
  id: string;

  constructor() {
    this.id = "67315a7130d6d4d2bb26e38a";
  }
}

export const storeMember = proxy(new MemberValtio());
