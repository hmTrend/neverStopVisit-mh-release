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
      const linkData = await mapLink.getAttribute("data-linkdata");
      if (linkData) {
        const placeInfo = JSON.parse(linkData);
        if (placeInfo.placeId === targetPlace) {
          // pagePromise를 먼저 생성
          const pagePromise = page.context().waitForEvent("page");
          // 클릭 수행
          await mapLink.click();
          // 새 페이지 가져오기
          const newPage = await pagePromise;

          // 새 탭이 로드될 때까지 기다림
          await newPage.waitForLoadState("load");

          // 새 탭으로 page 변수를 업데이트
          page = newPage;
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
