import { chromium, Page, Browser, BrowserContext, devices } from "playwright";

// 모바일 디바이스 타입 정의
type MobileDevice = "iPhone 13" | "Pixel 5" | "iPad Pro 11" | "Galaxy S8+";

interface BrowserOptions {
  headless?: boolean;
  slowMo?: number;
  mobile?: {
    device?: MobileDevice;
    isMobile?: boolean;
    viewport?: {
      width: number;
      height: number;
    };
    userAgent?: string;
  };
}

interface NavigateOptions {
  waitUntil?: "load" | "domcontentloaded" | "networkidle";
  timeout?: number;
}

interface WaitAndClickOptions {
  timeout?: number;
}

interface TypeTextOptions {
  clearFirst?: boolean;
  delay?: number;
}

interface ScreenshotOptions {
  path?: string;
  fullPage?: boolean;
  type?: "png" | "jpeg";
}

interface DownloadOptions {
  path?: string;
}

interface PageLoadOptions {
  additionalSelector?: string;
}

interface BrowserInstances {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

// 브라우저 시작 함수
export async function initBrowser(
  options: BrowserOptions = {},
): Promise<BrowserInstances> {
  try {
    const browser = await chromium.launch({
      headless: options.headless ?? false,
      slowMo: options.slowMo ?? 50,
    });

    // 모바일 옵션이 있는 경우
    if (options.mobile) {
      let contextOptions = {};

      // 미리 정의된 디바이스 사용
      if (options.mobile.device) {
        contextOptions = {
          ...devices[options.mobile.device],
        };
      }
      // 커스텀 모바일 설정
      else if (options.mobile.viewport) {
        contextOptions = {
          viewport: options.mobile.viewport,
          isMobile: options.mobile.isMobile ?? true,
          userAgent: options.mobile.userAgent,
        };
      }

      const context = await browser.newContext(contextOptions);
      const page = await context.newPage();
      return { browser, context, page };
    }

    // 일반 데스크톱 브라우저 실행
    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, context, page };
  } catch (e) {
    console.error(e instanceof Error ? e.message : String(e));
    throw Error("initBrowser");
  }
}

// 페이지 탐색 함수
export async function navigateToPage({
  page,
  url,
  options,
}: {
  page?: Page;
  url?: string;
  options?: NavigateOptions;
} = {}): Promise<void> {
  try {
    await page.goto(url, {
      waitUntil: options.waitUntil ?? "networkidle",
      timeout: options.timeout ?? 30000,
    });
  } catch (error) {
    console.error(`페이지 탐색 중 오류 발생: ${url}`, error);
    throw error;
  }
}

// 요소 대기 및 클릭 함수
export async function waitAndClick(
  page: Page,
  selector: string,
  options: WaitAndClickOptions = {},
): Promise<void> {
  try {
    await page.waitForSelector(selector, {
      state: "visible",
      timeout: options.timeout ?? 5000,
    });
    await page.click(selector);
  } catch (error) {
    console.error(`요소 클릭 중 오류 발생: ${selector}`, error);
    throw error;
  }
}

// 텍스트 입력 함수
export async function typeText(
  page: Page,
  selector: string,
  text: string,
  options: TypeTextOptions = {},
): Promise<void> {
  try {
    await page.waitForSelector(selector);
    if (options.clearFirst) {
      await page.fill(selector, "");
    }
    await page.type(selector, text, {
      delay: options.delay ?? 100,
    });
  } catch (error) {
    console.error(`텍스트 입력 중 오류 발생: ${selector}`, error);
    throw error;
  }
}

// 요소의 텍스트 가져오기 함수
export async function getElementText(
  page: Page,
  selector: string,
): Promise<string> {
  try {
    await page.waitForSelector(selector);
    return await page.$eval(selector, (el) => el.textContent?.trim() ?? "");
  } catch (error) {
    console.error(`텍스트 가져오기 중 오류 발생: ${selector}`, error);
    throw error;
  }
}

// 스크린샷 촬영 함수
export async function takeScreenshot(
  page: Page,
  options: ScreenshotOptions = {},
): Promise<void> {
  try {
    await page.screenshot({
      path: options.path ?? `screenshot-${Date.now()}.png`,
      fullPage: options.fullPage ?? false,
      type: options.type ?? "png",
    });
  } catch (error) {
    console.error("스크린샷 촬영 중 오류 발생", error);
    throw error;
  }
}

// 파일 다운로드 함수
export async function downloadFile(
  page: Page,
  triggerSelector: string,
  options: DownloadOptions = {},
): Promise<string> {
  try {
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.click(triggerSelector),
    ]);

    const path = options.path ?? `downloads/${download.suggestedFilename()}`;
    await download.saveAs(path);
    return path;
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생", error);
    throw error;
  }
}

// 리소스 정리 함수
export async function cleanup({
  browser,
  context,
  page,
}: Partial<BrowserInstances>): Promise<void> {
  try {
    await page?.close();
    await context?.close();
    await browser?.close();
  } catch (error) {
    console.error("리소스 정리 중 오류 발생", error);
    throw error;
  }
}

// 페이지 대기 함수
export async function waitForPageLoad(
  page: Page,
  options: PageLoadOptions = {},
): Promise<void> {
  try {
    await Promise.all([
      page.waitForLoadState("domcontentloaded"),
      page.waitForLoadState("networkidle"),
    ]);

    if (options.additionalSelector) {
      await page.waitForSelector(options.additionalSelector);
    }
  } catch (error) {
    console.error("페이지 로드 대기 중 오류 발생", error);
    throw error;
  }
}

// 요소가 보일 때까지 스크롤하는 함수
export async function scrollToElement(
  page: Page,
  selector: string,
): Promise<void> {
  try {
    await page.waitForSelector(selector);
    await page.$eval(selector, (el) => {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  } catch (error) {
    console.error(`요소로 스크롤 중 오류 발생: ${selector}`, error);
    throw error;
  }
}
