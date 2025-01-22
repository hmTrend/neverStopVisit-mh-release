import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetPlace = async ({
  page = undefined,
  placeNumber = "1023265975",
  isTest = true,
}: {
  page?: Page;
  placeNumber?: string;
  isTest?: boolean;
} = {}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&ssc=tab.m.all&oquery=%EC%8A%A4%EB%85%B8%EC%9A%B0%EC%9D%98%EC%9B%90+%EC%B2%AD%EC%A3%BC%EC%A0%90&tqi=iHtdasprfQZssEp4CzlssssstmV-481029&query=%EC%9D%BC%EC%82%B0%EC%A0%95%ED%98%95%EC%99%B8%EA%B3%BC",
        cookie: "",
      });
      page = test.page;
    }
    try {
      await clickTargetPlaceById({ placeNumber, page });
    } catch (e) {
      const pageO = await expandAndClickMore({ page });
      page = pageO;
      try {
        await clickTargetPlaceById({ placeNumber, page: pageO });
      } catch (e) {
        const pageO = await clickNextPageMoreLink({ page });
        page = pageO;
        await clickTargetPlaceNextMorePage({ placeNumber, page });
      }
    }
    return { page };
  } catch (e) {
    console.error(e);
    throw Error(`findTargetPlace > ${e.message}`);
  }
};

async function clickTargetPlaceNextMorePage({ placeNumber, page }) {
  try {
    console.log(11);
    const selector = `a[href*="/${placeNumber}"][role="button"]:not(.place_thumb)`;
    const link = await page.$(selector);
    if (!link) {
      throw new Error(`Link with ID ${placeNumber} not found`);
    }

    // 요소가 화면에 보이도록 스크롤
    await link.scrollIntoViewIfNeeded();

    // 잠시 대기
    await page.waitForTimeout(1000);

    // 클릭하기 전에 요소가 안정적인지 확인
    await link.waitForElementState("stable");

    // 클릭 수행 및 로드 상태 대기
    await Promise.all([
      link.click(),
      page.waitForLoadState("load", { timeout: 5000 }),
    ]);
    console.log(`Successfully clicked link with ID: ${placeNumber}`);
    return true;
  } catch (error) {
    console.error(
      `Error while trying to click link with ID ${placeNumber}:`,
      error,
    );
    throw error;
  }
}

async function clickTargetPlaceById({ placeNumber, page }) {
  try {
    // 여러 데이터 속성에 대해 해당 ID 검색
    const selectors = [
      `li[data-loc_plc-doc-id="${placeNumber}"] > div > div:nth-of-type(2) > a`,
      `li[data-nmb_hpl-doc-id="${placeNumber}"] > div > div:nth-of-type(2) > a`,
      `li[data-nmb_res-doc-id="${placeNumber}"] > div > div:nth-of-type(2) > a`,
      `li[data-nmb_hai-doc-id="${placeNumber}"] > div > div:nth-of-type(2) > a`,
    ];

    // 각 선택자에 대해 요소 찾기 시도
    for (const selector of selectors) {
      const element = await page.$(selector);
      if (element) {
        console.log(`Found element with selector: ${selector}`);
        await element.scrollIntoViewIfNeeded();
        await wait(1000);
        await element.click();
        return;
      }
    }
    console.error("err > clickTargetPlaceById > not Found");
    throw Error("err > clickTargetPlaceById > not Found");
  } catch (error) {
    console.error("err > clickTargetPlaceById", error);
    throw Error(error.message);
  }
}

async function expandAndClickMore({ page }) {
  try {
    // '펼쳐서 더보기' 버튼 찾기 시도
    const moreButton = await page.$(`.m2Hh0.frzpe a[role="button"]`);

    if (moreButton) {
      // 요소가 보이는지 확인
      const isVisible = await moreButton.isVisible();

      if (isVisible) {
        // 요소가 화면에 보이도록 스크롤
        await moreButton.scrollIntoViewIfNeeded();

        // 잠시 대기
        await page.waitForTimeout(1000);

        // 클릭하기 전에 요소가 안정적인지 확인
        await moreButton.waitForElementState("stable");

        // 클릭 수행
        await Promise.all([
          moreButton.click(),
          page.waitForLoadState("load", { timeout: 5000 }),
        ]);
        await wait(1500);
        console.log("Successfully clicked more button");
        return page;
      } else {
        console.log("More button exists but is not visible");
        return page;
      }
    } else {
      console.log("More button not found");
      return page;
    }
  } catch (error) {
    console.error("Error while trying to click more button:", error);
    throw Error(error.message);
  }
}

async function clickNextPageMoreLink({ page }) {
  try {
    // 여러 선택자를 시도하여 링크 찾기
    const linkSelectors = [
      // 클래스와 역할로 찾기
      'div.M7vfr a[role="button"]',
      // 더 구체적인 선택자
      "div.M7vfr a.cf8PL",
    ];

    let link = null;

    // 각 선택자로 요소 찾기 시도
    for (const selector of linkSelectors) {
      link = await page.$(selector);
      if (link) {
        break;
      }
    }

    if (link) {
      // 요소가 보이는지 확인
      const isVisible = await link.isVisible();

      if (isVisible) {
        // 요소가 화면에 보이도록 스크롤
        await link.scrollIntoViewIfNeeded();

        // 잠시 대기
        await page.waitForTimeout(1000);

        // 클릭하기 전에 요소가 안정적인지 확인
        await link.waitForElementState("stable");

        // 클릭 수행 및 로드 상태 대기
        await link.click();
        await page.waitForLoadState("networkidle", { timeout: 30 * 1000 });
        console.log("Successfully clicked hospital link");
        return page;
      } else {
        console.log("Hospital link exists but is not visible");
        return page;
      }
    } else {
      console.log("Hospital link not found");
      return page;
    }
  } catch (error) {
    console.error("Error while trying to click hospital link:", error);
    throw Error(error.message);
  }
}

findTargetPlace();
