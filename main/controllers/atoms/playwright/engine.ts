import { chromium, Page, Browser, BrowserContext, devices } from "playwright";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";

type MobileDevice = "iPhone 13" | "Pixel 5" | "iPad Pro 11" | "Galaxy S8+";

interface BrowserOptions {
  headless?: boolean;
  slowMo?: number;
  contextCallback?: (browser: Browser) => Promise<{
    context: BrowserContext;
    userAgent?: string;
  }>;
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

interface Network3gMode {
  is3gMode?: boolean;
  context?: BrowserContext;
  page?: Page;
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

    const { context, userAgent } = options.contextCallback
      ? await options.contextCallback(browser)
      : { context: await browser.newContext(), userAgent: undefined };

    const page = await context.newPage();
    return { browser, context, page };
  } catch (e) {
    console.error(e instanceof Error ? e.message : String(e));
    throw Error("initBrowser");
  }
}

export async function network3gMode({
  is3gMode,
  context,
  page,
}: Network3gMode = {}) {
  if (!is3gMode) return;
  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 100, // 지연시간 (ms)
    downloadThroughput: (750 * 1024) / 8, // bytes/s
    uploadThroughput: (250 * 1024) / 8, // bytes/s
  });
}

export async function createMobileContext({
  browser,
  userAgent,
}: {
  browser: Browser;
  userAgent: any;
}) {
  const context = await browser.newContext({
    userAgent: userAgent.userAgent,
    extraHTTPHeaders: userAgent.headers,
    viewport: { width: 412, height: 915 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2.625,
  });
  return { context, userAgent: userAgent.userAgent };
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
    console.error(`navigateToPage > ${error.message}`);
    throw `navigateToPage > ${error.message}`;
  }
}

// 요소 대기 및 클릭 함수
export async function waitAndClick({
  page,
  selector,
  options = {},
}: {
  page?: Page;
  selector?: string;
  options?: WaitAndClickOptions;
} = {}): Promise<void> {
  try {
    await page.waitForSelector(selector, {
      state: "visible",
      timeout: options.timeout ?? 5000,
    });
    await page.click(selector);
  } catch (error) {
    console.error(`waitAndClick`, error);
    throw error;
  }
}

// 텍스트 입력 함수
export async function typeText({
  page,
  selector,
  text,
  options,
}: {
  page?: Page;
  selector?: string;
  text?: string;
  options?: TypeTextOptions;
} = {}): Promise<void> {
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
