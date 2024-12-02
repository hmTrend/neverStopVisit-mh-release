import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";

export const findTargetPlaceInTargetBlog = async ({
  page = undefined,
  targetPlace = "1443081237",
  isTest = false,
}: {
  page?: Page;
  targetPlace?: string;
  isTest?: boolean;
} = {}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.blog.naver.com/qhfk73/223499983532",
        cookie: "",
      });
      page = test.page;
    }

    const mapLink = page.locator("a.se-map-info");

    try {
      // data-linkdata 속성에서 placeId 값 추출
      const linkData = await mapLink.getAttribute("data-linkdata");
      if (linkData) {
        const placeInfo = JSON.parse(linkData);

        // placeId가 1443081237와 일치하는지 확인
        if (placeInfo.placeId === targetPlace) {
          await mapLink.click();
        } else {
          console.log("placeId가 일치하지 않습니다.");
          throw new Error(
            "findTargetPlaceInTargetBlog > 지도 정보를 찾을 수 없거나 클릭할 수 없습니다: ",
          );
        }
      }
    } catch (error) {
      throw new Error(
        "findTargetPlaceInTargetBlog > 지도 정보를 찾을 수 없거나 클릭할 수 없습니다: " +
          error.message,
      );
    }
  } catch (e) {
    console.error(e.message);
    throw Error("ERR > targetKeywordSearch");
  }

  return { page };
};

// findTargetPlaceInTargetBlog();
