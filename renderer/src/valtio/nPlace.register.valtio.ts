import { proxy } from "valtio/vanilla";

class NPlaceRegisterValtio {
  selectedGroupName: string;
  groupList: [];
  selectedExcelList: any[];
  selectedGroupId: string;
  getExcelList: any[];
  getExcelListAlignFlat: any[];
  logicType: string[];

  constructor() {
    this.selectedGroupName = "";
    this.groupList = [];
    this.selectedExcelList = [];
    this.selectedGroupId = "";
    this.getExcelList = [];
    this.getExcelListAlignFlat = [];
    this.logicType = ["NAVER_BLOG", "GOOGLE_BLOG", "N_PLACE"];
  }
}

export const storeNPlace = proxy(new NPlaceRegisterValtio());
