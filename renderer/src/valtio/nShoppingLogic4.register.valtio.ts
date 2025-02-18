import { proxy } from "valtio/vanilla";

class NShoppingLogic4RegisterValtio {
  selectedGroupName: string;
  groupList: [];
  selectedExcelList: any[];
  selectedGroupId: string;
  getExcelList: any[];
  getExcelListAlignFlat: any[];
  logicType: { name: string; description: string }[] = [];

  constructor() {
    this.selectedGroupName = "";
    this.groupList = [];
    this.selectedExcelList = [];
    this.selectedGroupId = "";
    this.getExcelList = [];
    this.getExcelListAlignFlat = [];
    this.logicType = [
      {
        name: "LOGIC1",
        description:
          "네이버가격비교홈 > 상품찾기! > 상세페이지(상세정보펼쳐보기)",
      },
    ];
  }
}

export const storeNShoppingLogic4 = proxy(new NShoppingLogic4RegisterValtio());
