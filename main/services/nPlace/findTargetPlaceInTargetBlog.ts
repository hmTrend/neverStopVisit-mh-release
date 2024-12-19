import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetPlaceInTargetBlog = async ({
  page = undefined,
  targetPlace = "1760267682",
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
        url: "https://m.blog.naver.com/minidaoyou/223627474798",
        cookie: "",
      });
      page = test.page;
    }

    try {
      const extractPlaceId = (href) => {
        const match = href.match(/place\/(\d+)/);
        return match ? match[1] : null;
      };

      // 두 요소에 대한 Promise 생성
      const seMapPromise = page
        .waitForSelector("a.se-map-info")
        .then(async (element) => ({
          type: "se-map",
          element,
          async validate() {
            const linkData = await element.getAttribute("data-linkdata");
            if (!linkData) return false;
            const placeInfo = JSON.parse(linkData);
            return placeInfo.placeId === targetPlace;
          },
        }))
        .catch(() => null);

      const locationDivPromise = page
        .waitForSelector("div.location_component a")
        .then(async (element) => ({
          type: "location-component",
          element,
          async validate() {
            const href = await element.getAttribute("href");
            if (!href) return false;
            const placeId = extractPlaceId(href);
            return placeId === targetPlace;
          },
        }))
        .catch(() => null);

      // Promise.race로 먼저 나타나는 요소 찾기
      const result = await Promise.race([seMapPromise, locationDivPromise]);

      if (result) {
        // 유효성 검사
        const isValid = await result.validate();
        if (!isValid) {
          throw new Error(`PlaceId validation failed for ${result.type}`);
        }

        console.log(`Found valid ${result.type} element with matching placeId`);

        // 새 페이지 열림 대기를 위한 Promise 미리 생성
        const pagePromise = page.context().waitForEvent("page");

        // 스크롤 및 클릭 수행
        await result.element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500); // 스크롤 후 안정화 대기

        // 클릭 수행
        await result.element.click();
        // 새 페이지 가져오기
        const newPage = await pagePromise;
        // 새 탭이 로드될 때까지 기다림
        await newPage.waitForLoadState("load");

        // 새 탭으로 page 변수를 업데이트
        page = newPage;
      } else {
        console.log("placeId is not find");
        throw new Error("findTargetPlaceInTargetBlog > placeId is not find ");
      }
    } catch (error) {
      throw new Error(
        "findTargetPlaceInTargetBlog > placeId is not find" + error.message,
      );
    }
  } catch (e) {
    console.error(e.message);
    throw Error(`findTargetPlaceInTargetBlog > ${e.message}`);
  }

  return { page };
};

// findTargetPlaceInTargetBlog();
