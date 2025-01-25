import { findTargetPlace } from "./findTargetPlace";
import { targetKeywordSearchWithEmptyPage } from "../commons/naver/targetKeywordSearchWithEmptyPage";

export async function logicTypeN_PLACE({ ExcelData, pageI }) {
  let page = pageI;
  {
    const { page: pageO } = await targetKeywordSearchWithEmptyPage({
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
}
