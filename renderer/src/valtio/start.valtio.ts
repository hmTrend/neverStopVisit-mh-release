import { proxy } from "valtio/vanilla";

class StartValtio {
  selectProgram: [
    {
      title: string;
      groupList: [
        {
          _id: string;
          groupName: string;
          memberFid: string;
          createdAt: string;
          updatedAt: string;
        },
      ];
    },
  ];
  option: any;

  constructor() {
    this.selectProgram = [];
    this.option = [];
  }
}

export const storeStart = proxy(new StartValtio());
