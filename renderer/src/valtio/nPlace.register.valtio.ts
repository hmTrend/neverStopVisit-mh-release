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
          "네이버 빈페이지 > 검색 > 플레이스찾기! > 더보기 > 플레이스찾기! > 랜덤2번클릭(체류)",
      },
      {
        name: "LOGIC2",
        description:
          "네이버 빈 페이지 > 네이버검색! > 플레이스찾기! > 더보기 > 플레이스찾기! > 블로그 리뷰 > 랜덤클릭 > 플레이스찾기!(체류)",
      },
    ];
  }
}

export const storeNPlace = proxy(new NPlaceRegisterValtio());
