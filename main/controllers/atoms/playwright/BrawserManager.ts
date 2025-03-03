import { Browser, BrowserContext, chromium, Page } from "playwright";
import { getChromePath } from "./getChromPath";
import { dataPlaywright } from "../data/data.playwright";
import wait from "waait";
import { utilGetNextProxyForPlaywright } from "../util/util.getNextProxy";
import { DataCommons } from "../data/data.commons";
import { setDataUser } from "../user/data.user";

interface BrowserOptions {
  headless?: boolean;
  slowMo?: number;
  contextCallback?: (browser: Browser) => Promise<{
    context: BrowserContext;
    userAgent?: string;
  }>;
  cookies?: any[];
}

interface Network3gMode {
  cpuThrottlingRate?: number;
  is3gMode?: boolean;
  context?: BrowserContext;
  page?: Page;
}

interface NavigateOptions {
  waitUntil?: "load" | "domcontentloaded" | "networkidle";
  timeout?: number;
}

interface NetworkManager {
  page: Page;
  pendingRequests: Set<string>;
  setupNetworkListeners(): void;
  waitForAllRequests(): Promise<void>;
}

interface WaitAndClickOptions {
  timeout?: number;
}

interface TypeTextOptions {
  clearFirst?: boolean;
  delay?: number;
}

export class BrowserManager {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  networkManager: any;

  constructor() {
    // 생성자는 비동기가 될 수 없으므로 속성들을 초기화합니다
    this.browser = null;
    this.context = null;
    this.page = null;
    this.networkManager = null;
  }

  async init(
    options: BrowserOptions = {},
    dataPlaywrightPages = dataPlaywright.pages,
  ): Promise<this> {
    try {
      this.browser = await chromium.launch({
        headless: options.headless ?? false,
        slowMo: options.slowMo ?? 50,
        executablePath: getChromePath(),
      });

      const { context, userAgent } = options.contextCallback
        ? await options.contextCallback(this.browser)
        : { context: await this.browser.newContext(), userAgent: undefined };

      this.context = context;

      if (options.cookies && options.cookies.length > 0) {
        await this.context.addCookies(options.cookies);
      }

      this.page = await this.context.newPage();
      dataPlaywright.pages.push(this.page);
      return this;
    } catch (e) {
      console.error(e instanceof Error ? e.message : String(e));
      throw Error("BrowserManager 초기화 실패");
    }
  }

  static async createMobileContext(userAgent: any, browser: Browser) {
    try {
      const proxySettings = utilGetNextProxyForPlaywright({
        isProxy: DataCommons("commons").getData().ip === "PROXY",
      });
      console.log("proxySettings.server 33333333");
      console.log(proxySettings.server);
      setDataUser({ myProxy: proxySettings.server });
      const context = await browser.newContext({
        userAgent: userAgent.userAgent,
        extraHTTPHeaders: userAgent.headers,
        viewport: { width: 545, height: 915 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2.625,
        proxy: proxySettings,
      });

      return { context, userAgent: userAgent.userAgent };
    } catch (error) {
      console.error(`createMobileContext > ${error.message}`);
      throw Error(`createMobileContext > ${error.message}`);
    }
  }

  async networkAndCpuThrottling(options: Network3gMode = {}): Promise<void> {
    const { is3gMode, cpuThrottlingRate } = options;
    const client = await this.context.newCDPSession(this.page);

    if (is3gMode) {
      await client.send("Network.enable");
      await client.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 100, // 지연시간 (ms)
        downloadThroughput: (750 * 1024) / 8, // bytes/s
        uploadThroughput: (250 * 1024) / 8, // bytes/s
      });
    }

    if (cpuThrottlingRate) {
      await client.send("Emulation.setCPUThrottlingRate", {
        rate: cpuThrottlingRate,
      });
    }
  }

  async navigateToPage(
    options: {
      url?: string;
      options?: NavigateOptions;
    } = {},
  ): Promise<void> {
    for (let i = 0; i < 3; i++) {
      try {
        const { url, options: navigateOptions = {} } = options;

        await this.page.goto(url, {
          waitUntil: navigateOptions.waitUntil ?? "networkidle",
          timeout: 30 * 1000,
        });
        return;
      } catch (error) {
        console.error(`navigateToPage > ${error.message}`);
        if (i === 2) {
          throw Error(`navigateToPage > ${error.message}`);
        }
      }
    }
  }

  createNetworkManager(): NetworkManager {
    const pendingRequests = new Set<string>();

    const setupNetworkListeners = () => {
      // 요청 시작 시 Set에 추가
      this.page.on("request", (request) => {
        pendingRequests.add(request.url());
      });

      // 요청 완료 시 Set에서 제거
      this.page.on("requestfinished", (request) => {
        pendingRequests.delete(request.url());
      });

      // 요청 실패 시에도 Set에서 제거
      this.page.on("requestfailed", (request) => {
        pendingRequests.delete(request.url());
      });
    };

    const waitForAllRequests = async () => {
      try {
        while (pendingRequests.size > 0) {
          await this.page.waitForTimeout(30 * 1000);
        }
      } catch (error) {
        console.error("Error waiting for network requests:", error);
        throw Error("waitForAllRequests");
      }
    };

    setupNetworkListeners();

    this.networkManager = {
      page: this.page,
      pendingRequests,
      setupNetworkListeners,
      waitForAllRequests,
    };

    return this.networkManager;
  }

  async waitAndClick({
    selector,
    options = {},
  }: {
    selector?: string;
    options?: WaitAndClickOptions;
  } = {}): Promise<void> {
    try {
      await this.page.waitForSelector(selector, {
        state: "visible",
        timeout: options.timeout ?? 5000,
      });
      await this.page.click(selector);
    } catch (error) {
      console.error(`waitAndClick > ${error.message}`);
      throw Error(`waitAndClick > ${error.message}`);
    }
  }

  async typeText({
    selector,
    text,
    options = {},
  }: {
    selector?: string;
    text?: string;
    options?: TypeTextOptions;
  } = {}): Promise<void> {
    try {
      await this.page.waitForSelector(selector, { timeout: 60 * 1000 });
      if (options.clearFirst) {
        await this.page.fill(selector, "");
      }
      await this.page.type(selector, text, {
        delay: options.delay ?? 100,
      });
    } catch (error) {
      console.error(`typeText > ${error.message}`);
      throw Error(`typeText > ${error.message}`);
    }
  }

  async getCookies() {
    try {
      return await this.context.cookies();
    } catch (e) {
      console.error(`BrowserManager > getCookies > ${e.message}`);
      throw Error(`BrowserManager > getCookies > ${e.message}`);
    }
  }

  async cleanup(): Promise<void> {
    try {
      await this.page?.close();
      await this.context?.close();
      await this.browser?.close();

      if (dataPlaywright?.pages) {
        for (const page of dataPlaywright.pages) {
          if (!page.isClosed()) {
            await page.close();
          }
        }
      }

      // 참조 제거
      this.page = null;
      this.context = null;
      this.browser = null;
    } catch (error) {
      console.error(`cleanup > ${error.message}`);
      throw Error(`cleanup > ${error.message}`);
    }
  }

  async pressKey({ select }) {
    await this.page.keyboard.press(select);
  }

  async switchToOpenedTab(): Promise<Page> {
    try {
      await wait(2 * 1000);
      // 열려있는 모든 페이지 가져오기
      const pages = this.context.pages();

      // 가장 최근에 열린 페이지 (마지막 페이지) 반환
      const latestPage = pages[pages.length - 1];

      if (!latestPage) {
        throw Error(`switchToOpenedTab > No pages found`);
      }

      // 페이지가 완전히 로드될 때까지 대기
      await latestPage.waitForLoadState("load");

      // 현재 활성 페이지 업데이트
      this.page = latestPage;

      return latestPage;
    } catch (error) {
      console.error(`switchToOpenedTab > ${error.message}`);
      throw Error(`switchToOpenedTab > ${error.message}`);
    }
  }

  async transSelecterType({ selector }) {
    try {
      let element;
      if (typeof selector === "string") {
        element = this.page.locator(selector);
      } else {
        element = this.page.getByRole(selector.getByRole, {
          name: selector.name,
        });
      }
      await element.waitFor();
      await element.scrollIntoViewIfNeeded({ timeout: 1000 });
      await element.click({ timeout: 1000 }); // force 옵션 추가
    } catch (e) {
      console.error(`transSelecterType > No expand details button`);
    }
  }

  async locatorWaitForSelector({ selector }) {
    await this.page.waitForSelector(selector, {
      state: "visible",
      timeout: 30 * 1000,
    });
  }
}
