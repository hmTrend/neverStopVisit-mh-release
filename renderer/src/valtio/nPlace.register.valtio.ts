import { proxy } from "valtio/vanilla";

class NPlaceRegisterValtio {
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
          "네이버 빈페이지 > 검색 > 플레이스찾기! > 펼쳐서더보기 > 플레이스찾기! > 전체더보기 > 플레이스찾기!",
      },
    ];
  }
}

export const storeNPlace = proxy(new NPlaceRegisterValtio());
