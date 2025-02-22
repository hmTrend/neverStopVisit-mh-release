import wait from "waait";
import { findSelectorAndScroll } from "../commons/findSelectorAndScroll";
import { gotoPage } from "../commons/gotoPage";
import { Page } from "playwright";

export async function clickTargetPlaceOrGoToNextStep({
  isTest = false,
  page = undefined,
  browserManager = undefined,
  placeNumber = "1918144108",
}: {
  isTest?: boolean;
  page?: Page;
  browserManager?: any;
  placeNumber?: string;
} = {}) {
  if (isTest) {
    const { getPage, getBrowserManager } = await gotoPage({
      is3gMode: true,
      cpuThrottlingRate: 20,
      url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%ED%95%A9%EC%A0%95%EB%84%A4%EC%9D%BC",
      // 합정네일 모바일
    });
    browserManager = getBrowserManager;
    page = getPage;
  }
  try {
    const networkManager = browserManager.createNetworkManager();
    await networkManager.waitForAllRequests();

    await findSelectorAndScroll({
      selector: ".place_section_header_title",
      browserManager,
      page,
    });
    await clickTargetPlaceById({ placeNumber, page });
  } catch (e) {
    const pageO = await expandAndClickMore({ page });
    page = pageO;
    try {
      await clickTargetPlaceById({ placeNumber, page: pageO });
    } catch (e) {
      try {
        const pageO = await clickNextPageMoreLink({ page });
        page = pageO;
      } catch (e) {
        console.error(`clickNextPageMoreLink > ${e.message}`);
      }
      {
        const pageO = await clickTargetPlaceNextMorePage({
          placeNumber,
          page,
        });
        page = pageO;
      }
    }
  }
}

async function clickTargetPlaceNextMorePage({ placeNumber, page }) {
  try {
    const selector = `a[href*="/${placeNumber}"][role="button"]:not(.place_thumb)`;
    await page.waitForSelector(selector, { timeout: 60 * 1000 });
    const link = await page.$(selector);
    if (!link) {
      throw new Error(
        `clickTargetPlaceNextMorePage > Link with ID ${placeNumber} not found`,
      );
    }

    // 요소가 화면에 보이도록 스크롤
    await link.scrollIntoViewIfNeeded();

    // 잠시 대기
    await page.waitForTimeout(1000);

    // 클릭하기 전에 요소가 안정적인지 확인
    await link.waitForElementState("stable");

    // 클릭 수행 및 로드 상태 대기
    await link.click();
    await page.waitForLoadState("networkidle", { timeout: 90 * 1000 });
    console.log(`Successfully clicked link with ID: ${placeNumber}`);
    return page;
  } catch (error) {
    console.error(
      `Error while trying to click link with ID ${placeNumber}:`,
      error,
    );
    throw Error(`clickTargetPlaceNextMorePage > ${error.message}`);
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
        await link.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        await link.waitForElementState("stable");
        await link.click();
        await page.waitForLoadState("networkidle", { timeout: 90 * 1000 });
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

async function moveToPlaceSection({ page }) {
  const targetLocator = page.locator("h2.place_section_header");

  // 요소가 화면에 나타날 때까지 대기
  console.log("Waiting for the target element to appear...");
  await targetLocator.waitFor({ state: "visible", timeout: 30 * 1000 }); // 최대 10초 대기

  // 요소가 화면에 보이도록 스크롤
  console.log("Scrolling to the target element...");
  await targetLocator.scrollIntoViewIfNeeded();
}

async function clickTargetPlaceById({ placeNumber, page }) {
  try {
    // 여러 데이터 속성에 대해 해당 ID 검색
    const selectors = [
      `li[data-loc_plc-doc-id="${placeNumber}"] > div > div:nth-of-type(2) > a`,
      `li[data-nmb_hpl-doc-id="${placeNumber}"] > div > div:nth-of-type(2) > a`,
      `li[data-nmb_res-doc-id="${placeNumber}"] > div.CHC5F > a`,
      `li[data-nmb_hai-doc-id="${placeNumber}"] > div > div:nth-of-type(2) > a`,
    ];

    // 각 선택자에 대해 요소 찾기 시도
    for (const selector of selectors) {
      const element = await page.$(selector);
      if (element) {
        // console.log(`Found element with selector: ${selector}`);
        await element.scrollIntoViewIfNeeded();
        await wait(1000);
        await element.click();
        await page.waitForLoadState("networkidle", { timeout: 90 * 1000 });
        await wait(1500);
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
    const selectors = [
      '.iLepm.UoLNU a[role="button"]',
      '.m2Hh0.frzpe a[role="button"]',
    ];

    const clickPromises = selectors.map((selector) => {
      return new Promise(async (resolve, reject) => {
        try {
          // 요소가 나타날 때까지 대기 (최대 30초)
          const moreButton = await page.waitForSelector(selector, {
            state: "visible",
            timeout: 30 * 1000,
          });

          if (moreButton) {
            try {
              await moreButton.scrollIntoViewIfNeeded();
              await moreButton.click();
            } catch (e) {
              console.error(`moreButton > ${e.message}`);
              await wait(3 * 1000);
            }
            await page.waitForTimeout(1500); // 추가 대기 시간
            console.log(
              `Successfully clicked more button with selector: ${selector}`,
            );
            resolve(true); // 성공적으로 클릭했음을 알림
          }
        } catch (e) {
          // console.log(`Selector ${selector} failed: ${e.message}`);
          reject(e); // 실패 시 에러 전달
        }
      });
    });

    // Promise.race로 가장 먼저 성공하거나 실패하는 것을 기다림
    const results = await Promise.race([
      Promise.any(clickPromises), // 하나라도 성공하면 종료
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Timeout waiting for any button")),
          66 * 1000,
        ),
      ), // 전체 타임아웃 설정
    ]);

    if (!results) {
      console.log("No more button found or clickable");
    }

    return page;
  } catch (error) {
    console.error("Error in expandAndClickMore:", error);
    return page; // 에러가 나도 페이지를 반환하여 계속 진행
  }
}

// clickTargetPlaceOrGoToNextStep();
