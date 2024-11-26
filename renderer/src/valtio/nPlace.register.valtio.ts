import { proxy } from "valtio/vanilla";

class NPlaceRegisterValtio {
  selectedGroupName: string;
  groupList: [];
  selectedExcelList: any[];
  selectedGroupId: string;
  getExcelList: any[];
  getExcelListAlignFlat: any[];

  constructor() {
    this.selectedGroupName = "";
    this.groupList = [];
    this.selectedExcelList = [];
    this.selectedGroupId = "";
    this.getExcelList = [];
    this.getExcelListAlignFlat = [];
  }
}

export const storeNPlace = proxy(new NPlaceRegisterValtio());
