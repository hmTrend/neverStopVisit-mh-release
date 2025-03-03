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
  try {
    const blogReviewSelector = 'a[href*="/review/ugc"]:has-text("블로그 리뷰")';
    await page.locator(blogReviewSelector).first().click();
  } catch (e) {
    console.error(`blogReviewSelector > ${e.message}`);
    throw Error(`blogReviewSelector > ${e.message}`);
  }
}

async function blogReviewListOfOneRandomClick({ page }: { page: Page }) {
  try {
  } catch (e) {
    console.error(`blogReviewListOfOneRandomClick > ${e.message}`);
    throw Error(`blogReviewListOfOneRandomClick > ${e.message}`);
  }
  await wait(1000);
  // 모든 블로그 링크 li 요소 가져오기
  const blogLinks = await page.locator("li.EblIP a.behIY").all();

  if (blogLinks.length === 0) {
    console.log("블로그 링크를 찾을 수 없습니다.");
    return;
  }

  // blog.naver.com이 포함된 링크만 저장할 배열
  const naverBlogLinks = [];
  const naverBlogIndexes = [];

  // 각 링크의 URL 확인하여 네이버 블로그만 필터링
  for (let i = 0; i < blogLinks.length; i++) {
    const linkUrl = await blogLinks[i].getAttribute("href");
    // blog.naver.com이 포함된 링크만 유효한 링크로 간주
    if (linkUrl && linkUrl.includes("blog.naver.com")) {
      naverBlogLinks.push(blogLinks[i]);
      naverBlogIndexes.push(i);
    }
  }

  if (naverBlogLinks.length === 0) {
    console.log("네이버 블로그 링크가 없습니다.");
    return;
  }

  // 네이버 블로그 링크 중에서 랜덤 선택
  const randomIndex = Math.floor(Math.random() * naverBlogLinks.length);
  const selectedLink = naverBlogLinks[randomIndex];
  const originalIndex = naverBlogIndexes[randomIndex];

  console.log(
    `총 ${blogLinks.length}개 링크 중 ${naverBlogLinks.length}개가 네이버 블로그이며, ${originalIndex + 1}번째 링크를 클릭합니다.`,
  );

  // 선택된 링크의 URL 가져오기
  const linkUrl = await selectedLink.getAttribute("href");
  console.log(`클릭할 링크 URL: ${linkUrl}`);

  // 블로그 제목 가져오기 (선택 사항)
  const titleElement = selectedLink.locator(".pui__dGLDWy");
  const title = await titleElement.textContent();
  console.log(`블로그 제목: ${title}`);

  // 랜덤으로 선택된 링크 클릭
  await selectedLink.click();

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
