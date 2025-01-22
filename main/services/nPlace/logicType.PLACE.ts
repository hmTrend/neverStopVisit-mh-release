import { targetKeywordSearch } from "./targetKeywordSearch";
import { findTargetBlog2 } from "./findTargetBlog2";
import { findTargetPlaceInTargetBlog } from "./findTargetPlaceInTargetBlog";
import wait from "waait";
import { clickNearbyAttractions } from "./clickNearbyAttractions";
import { findTargetPlace } from "./findTargetPlace";

export async function logicTypeN_PLACE({ ExcelData, pageI }) {
  let page = pageI;
  {
    const { page: pageO } = await targetKeywordSearch({
      page,
      targetKeyword: ExcelData.targetKeyword,
    });
    page = pageO;
  }
  {
    const { page: pageO } = await findTargetPlace({
      page,
      placeNumber: ExcelData.placeNumber,
      delayTime: ExcelData.delayTime * 1000,
    });
    page = pageO;
  }
  {
    const { page: pageO } = await clickNearbyAttractions({ page });
    page = pageO;
  }
}
