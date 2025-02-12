import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetPlace = async ({
  page = undefined,
  placeNumber = "1376105447",
  isTest = true,
  delayTime = 0,
}: {
  page?: Page;
  placeNumber?: string;
  isTest?: boolean;
  delayTime?: number;
} = {}) => {
  if (isTest) {
    const test = new PuppeteerEngine();
    await test.initialize({
      url: "https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&ssc=tab.m.all&oquery=%EC%95%BC%EB%8B%B9%EB%A7%9B%EC%A7%91&tqi=iIY2gspr44ossFCz4c0ssssstwC-128760&query=%EC%98%A4%EC%82%B0%ED%97%AC%EC%8A%A4%EC%9E%A5",
      cookie: "",
      networkSpeed: "3G",
    });
    page = test.page;
  }
  try {
    await clickTargetPlaceOrGoToNextStep({ page, placeNumber });
    await lastActionRandomClick({ page, placeNumber, delayTime });
    return { page };
  } catch (e) {
    console.error(e);
    throw Error(`findTargetPlaceNLastActionRandomClick > ${e.message}`);
  }
};

async function clickTargetPlaceNextMorePage({ placeNumber, page }) {
  try {
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
    await link.click();
    await page.waitForLoadState("networkidle", { timeout: 90 * 1000 });
    console.log(`Successfully clicked link with ID: ${placeNumber}`);
    return page;
  } catch (error) {
    console.error(
      `Error while trying to click link with ID ${placeNumber}:`,
      error,
    );
    throw error;
  }
}

async function lastActionRandomClick({ page, placeNumber, delayTime }) {
  const { excludeText } = await clickRandomTab({
    page,
    placeNumber,
  });
  await wait(delayTime);
  await clickRandomTab({ page, placeNumber, excludeText });
  await wait(3 * 1000);
  return { page };
}

async function clickTargetPlaceOrGoToNextStep({ page, placeNumber }) {
  try {
    console.log(1);
    const { waitForTargetUrl } = placeMapUrlPatternCheck({ page });
    await waitForTargetUrl;
    console.log(2);
    await clickTargetPlaceById({ placeNumber, page });
  } catch (e) {
    const pageO = await expandAndClickMore({ page });
    page = pageO;
    try {
      await clickTargetPlaceById({ placeNumber, page: pageO });
    } catch (e) {
      {
        const pageO = await clickNextPageMoreLink({ page });
        page = pageO;
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

function placeMapUrlPatternCheck({ page }) {
  const targetUrlPattern = "https://search.pstatic.net/common/?autoRotate=true";

  // 프로미스를 사용하여 조건 충족 여부를 기다림
  const waitForTargetUrl = new Promise<void>(async (resolve, reject) => {
    let timeoutId;

    const timeout = 60 * 1000;
    timeoutId = setTimeout(() => {
      reject(new Error(`Timeout waiting for URL pattern: ${targetUrlPattern}`));
    }, timeout);

    // 네트워크 응답 감시
    page.on("response", async (response) => {
      const url = response.url();

      // 대상 URL 패턴이 포함된 경우
      if (url.includes(targetUrlPattern)) {
        console.log(`Detected target URL: ${url}`);
        clearTimeout(timeoutId); // 타임아웃 해제
        resolve(); // 조건 충족으로 프로미스 종료
      }
    });
  });
  return { waitForTargetUrl };
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
        console.log(`Found element with selector: ${selector}`);
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
            await moreButton.scrollIntoViewIfNeeded();
            await page.waitForTimeout(1000);
            await moreButton.waitForElementState("stable");
            await Promise.all([
              moreButton.click(),
              page.waitForLoadState("load", { timeout: 30 * 1000 }),
            ]);
            await page.waitForTimeout(1500); // 추가 대기 시간
            console.log(
              `Successfully clicked more button with selector: ${selector}`,
            );
            resolve(true); // 성공적으로 클릭했음을 알림
          }
        } catch (e) {
          console.log(`Selector ${selector} failed: ${e.message}`);
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
          30 * 1000,
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

async function clickRandomTab({ page, placeNumber, excludeText = "" }) {
  try {
    console.log("excludeText 33333");
    console.log(excludeText);
    const selectorReady = 'a.DDfpb[role="button"]';

    // 버튼이 보일 때까지 대기
    await page.waitForSelector(selectorReady, {
      state: "visible",
      timeout: 90 * 1000,
    });
    // 모든 탭 메뉴 요소 찾기
    const selector = `a[href*="/${placeNumber}/"][role="tab"].tpj9w._tab-menu`;
    const tabs = await page.$$(selector);

    if (!tabs || tabs.length === 0) {
      throw new Error("No tab menu elements found");
    }

    const availableTabs = [];
    for (const tab of tabs) {
      const tabText = await tab.$eval("span", (span) => span.textContent);
      if (tabText !== excludeText && tabText !== "정보" && tabText !== "홈") {
        availableTabs.push({
          element: tab,
          text: tabText,
        });
      }
    }

    if (availableTabs.length === 0) {
      throw new Error(`No available tabs after excluding "${excludeText}"`);
    }

    // 랜덤으로 탭 선택
    const randomIndex = Math.floor(Math.random() * availableTabs.length);
    const selectedTab = availableTabs[randomIndex];

    // 선택된 탭의 텍스트와 href 가져오기 (로깅용)
    const tabHref = await selectedTab.element.getAttribute("href");
    console.log(`Randomly selected tab: ${selectedTab.text} (${tabHref})`);

    // 요소가 화면에 보이도록 스크롤
    await selectedTab.element.scrollIntoViewIfNeeded();

    // 잠시 대기
    await page.waitForTimeout(1000);

    // 클릭하기 전에 요소가 안정적인지 확인
    await selectedTab.element.waitForElementState("stable");

    // 클릭 수행 및 로드 상태 대기
    await Promise.all([
      selectedTab.element.click(),
      page.waitForLoadState("load", { timeout: 5000 }),
    ]);
    if (selectedTab.text === "주변") {
      try {
        console.log("this is 주변");
        const spotButton = await page
          .locator("a.T00ux span", { hasText: "명소" })
          .first();
        // 버튼이 보일 때까지 대기
        await spotButton.waitFor({
          state: "visible",
          timeout: 30 * 1000,
        });

        // 요소가 화면에 보이도록 스크롤
        await spotButton.scrollIntoViewIfNeeded();

        // 잠시 대기
        await page.waitForTimeout(1000);
        await spotButton.click();
        await page.waitForLoadState("load", { timeout: 5000 });
      } catch (e) {
        console.error(`err 명소 is not found > ${e.message}`);
      }
    }

    console.log(`Successfully clicked random tab: ${selectedTab.text}`);
    return { excludeText: selectedTab.text };
  } catch (error) {
    console.error("Error while trying to click random tab:", error);
    throw error;
  }
}

findTargetPlace();
