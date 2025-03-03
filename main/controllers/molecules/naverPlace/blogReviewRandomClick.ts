import wait from "waait";
import { gotoPage } from "../commons/gotoPage";
import { Page } from "playwright";
import { BrowserManager } from "../../atoms/playwright/BrawserManager";

export async function blogReviewRandomClick({
  isTest = false,
  page = undefined,
  browserManager = undefined,
  placeNumber = "1918144108",
}: {
  isTest?: boolean;
  page?: Page;
  browserManager?: BrowserManager;
  placeNumber?: string;
} = {}) {
  if (isTest) {
    const { getPage, getBrowserManager } = await gotoPage({
      is3gMode: false,
      cpuThrottlingRate: 0,
      url: "https://m.place.naver.com/nailshop/1918144108/home?entry=pll",
      // 합정네일 모바일
    });
    browserManager = getBrowserManager;
    page = getPage;
  }
  try {
    const networkManager = browserManager.createNetworkManager();
    await networkManager.waitForAllRequests();
    await blogReviewSelector({ page });
    await blogReviewListOfOneRandomClick({ page });
    page = await browserManager.switchToOpenedTab();
    await placeLinkClickInBlogDetailPage({ page });
  } catch (e) {
    console.error(`blogReviewRandomClick > ${e.message}`);
    throw Error(`blogReviewRandomClick > ${e.message}`);
  }
}

async function blogReviewSelector({ page }: { page: Page }) {
  const blogReviewSelector = 'a[href*="/review/ugc"]:has-text("블로그 리뷰")';
  await page.locator(blogReviewSelector).first().click();
}

async function blogReviewListOfOneRandomClick({ page }: { page: Page }) {
  await wait(1000);
  // 모든 블로그 링크 li 요소 가져오기
  const blogLinks = await page.locator("li.EblIP a.behIY").all();

  if (blogLinks.length === 0) {
    console.log("블로그 링크를 찾을 수 없습니다.");
    return;
  }

  // 랜덤 인덱스 생성
  const randomIndex = Math.floor(Math.random() * blogLinks.length);
  console.log(
    `총 ${blogLinks.length}개 링크 중 ${randomIndex + 1}번째 링크를 클릭합니다.`,
  );

  // 선택된 링크의 URL 가져오기 (선택 사항)
  const linkUrl = await blogLinks[randomIndex].getAttribute("href");
  console.log(`클릭할 링크 URL: ${linkUrl}`);

  // 블로그 제목 가져오기 (선택 사항)
  const titleElement = blogLinks[randomIndex].locator(".pui__dGLDWy");
  const title = await titleElement.textContent();
  console.log(`블로그 제목: ${title}`);

  // 랜덤으로 선택된 링크 클릭
  await blogLinks[randomIndex].click();

  // 페이지가 로드될 때까지 잠시 대기
  await page.waitForLoadState("networkidle");
  console.log("페이지 로드 완료");
  return { pageO: page };
}

async function placeLinkClickInBlogDetailPage({ page }: { page: Page }) {
  await wait(1000);
  try {
    // 두 요소에 대한 Promise 생성
    const locationPromise = page
      .waitForSelector("div.location_component div.location a", {
        state: "visible",
        timeout: 10 * 1000, // 10초 타임아웃
      })
      .then((element) => {
        return { element, type: "location_component" };
      });

    const mapTextPromise = page
      .waitForSelector("div.se-module.se-module-map-text a.se-map-info", {
        state: "visible",
        timeout: 10 * 1000, // 10초 타임아웃
      })
      .then((element) => {
        return { element, type: "se-module-map-text" };
      });

    // Promise.race를 사용하여 먼저 보이는 요소 찾기
    console.log("두 요소 중 먼저 보이는 것을 기다리는 중...");

    const result = await Promise.race([locationPromise, mapTextPromise]).catch(
      (error) => {
        console.error("요소를 찾지 못했습니다:", error);
        return null;
      },
    );

    // 결과에 따라 클릭 수행
    if (result) {
      console.log(`먼저 발견된 요소: ${result.type}`);
      await result.element.click();
      console.log(`${result.type} 요소를 클릭했습니다.`);

      // 스크린샷 저장
      await page.screenshot({ path: `clicked-${result.type}.png` });
    } else {
      console.log("두 요소 모두 지정된 시간 내에 나타나지 않았습니다.");
    }
  } catch (error) {
    console.error("실행 중 오류 발생:", error);
  }
}

// blogReviewRandomClick();
