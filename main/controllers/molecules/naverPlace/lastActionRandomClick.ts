import wait from "waait";
import { Page } from "playwright";
import { gotoPage } from "../commons/gotoPage";
import { BrowserManager } from "../../atoms/playwright/BrawserManager";

export async function lastActionRandomClick({
  isTest = false,
  page = undefined,
  browserManager = undefined,
  placeNumber = "234267045",
  delayTime = 5,
}: {
  isTest?: boolean;
  page?: Page;
  browserManager?: BrowserManager;
  placeNumber?: string;
  delayTime?: number;
} = {}) {
  if (isTest) {
    const { getPage, getBrowserManager } = await gotoPage({
      is3gMode: false,
      cpuThrottlingRate: 0,
      url: "https://m.place.naver.com/restaurant/234267045/home?entry=pll",
      // 강남맛집 > 츄라우미 역삼본점 / 플레이스 상세페이지
    });
    browserManager = getBrowserManager;
    page = getPage;
  }
  try {
    const networkManager = browserManager.createNetworkManager();
    await networkManager.waitForAllRequests();
    // await page.waitForSelector('a[role="button"].QKxqx'); // 알림받기 페이지 기다리기 > 피부과 없어서 삭제
    const { excludeText } = await clickRandomTab({
      page,
      placeNumber,
      networkManager,
      delayTime,
    });
    await wait(delayTime * 1000);
    await clickRandomTab({
      page,
      placeNumber,
      excludeText,
      networkManager,
      delayTime: 0,
    });
    await wait(3 * 1000);
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error(`lastActionRandomClick > ${e.message}`);
  }
}

async function clickRandomTab({
  page,
  placeNumber,
  excludeText = "",
  networkManager,
  delayTime,
}: {
  page: Page;
  placeNumber: string;
  excludeText?: string;
  networkManager?: any;
  delayTime: number;
}) {
  try {
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
    await selectedTab.element.click();
    await networkManager.waitForAllRequests();

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
        await page.waitForLoadState("load", { timeout: 10 * 1000 });
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

// lastActionRandomClick();
