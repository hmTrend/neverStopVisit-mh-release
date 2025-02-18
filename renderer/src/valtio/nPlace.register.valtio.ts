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
        name: "NAVER_BLOG",
        description:
          "네이버홈 > 검색 > 통합첫페이지 > 블로그글찾기! > 블로그탭 > 블로그글찾기!",
      },
      {
        name: "GOOGLE_BLOG",
        description:
          "구글홈 > 검색 > 네이버홈 > 검색 > 통합첫페이지 > 블로그글찾기! > 블로그탭 > 블로그글찾기!",
      },
      {
        name: "N_PLACE",
        description:
          "네이버홈 > 검색 > 통합첫페이지 > 플레이스찾기! > 펼쳐서더보기 > 플레이스찾기! > 전체더보기 > 플레이스찾기!",
      },
    ];
  }
}

export const storeNPlace = proxy(new NPlaceRegisterValtio());
