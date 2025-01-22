import { targetKeywordSearch } from "./targetKeywordSearch";
import { findTargetBlog2 } from "./findTargetBlog2";
import { findTargetPlaceInTargetBlog } from "./findTargetPlaceInTargetBlog";
import wait from "waait";
import { clickNearbyAttractions } from "./clickNearbyAttractions";

export async function logicTypeGOOGLE({ ExcelData, pageI }) {
  let page = pageI;
  {
    const { page: pageO } = await targetKeywordSearch({
      page,
      targetKeyword: ExcelData.targetKeyword,
    });
    page = pageO;
  }
  {
    const { page: pageO } = await findTargetBlog2({
      page,
      targetBlog: ExcelData.targetBlog,
    });
    page = pageO;
  }
  {
    const { page: pageO } = await findTargetPlaceInTargetBlog({
      page,
      targetPlace: ExcelData.placeNumber,
    });
    page = pageO;
  }
  await wait(ExcelData.delayTime * 1000);
  {
    const { page: pageO } = await clickNearbyAttractions({ page });
    page = pageO;
  }
}
