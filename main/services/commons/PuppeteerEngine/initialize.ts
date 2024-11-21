import { Browser, Page } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { getNextProxy } from "../../../lib/proxy/getNextProxy";
import { validateCookie } from "./validateCookie";

export const initialize = async ({
  url,
  page,
  pages,
  firefoxEngine,
  cookie,
  browser,
}: {
  url: string;
  page: Page;
  firefoxEngine: any;
  pages: Page[];
  cookie;
  browser: Browser;
}) => {
  const proxySettings = getNextProxy();
  const userAgent =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1";

  try {
    browser = await firefoxEngine.launch({
      headless: false,
      args: [
        "--disable-blink-features=AutomationControlled",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
      ],
      firefoxUserPrefs: {
        "media.navigator.streams.fake": true,
        "permissions.default.geo": 1,
        "dom.webnotifications.enabled": false,
        "general.useragent.override": userAgent,
        "privacy.trackingprotection.enabled": false,
        "network.http.sendRefererHeader": 2,
        "network.cookie.cookieBehavior": 0,
      },
    });

    const context = await browser.newContext({
      viewport: { width: 375, height: 812 },
      userAgent: userAgent,
      deviceScaleFactor: 2,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-User": "?1",
        "Sec-Fetch-Dest": "document",
      },
    });

    // 자동화 감지 방지를 위한 스크립트 주입
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
      Object.defineProperty(navigator, "plugins", {
        get: () => [1, 2, 3, 4, 5],
      });
      Object.defineProperty(navigator, "languages", {
        get: () => ["ko-KR", "ko", "en-US", "en"],
      });

      // permissions.query 수정된 버전
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (
        parameters: any,
      ): Promise<PermissionStatus> => {
        if (parameters.name === "notifications") {
          return Promise.resolve({
            state: Notification.permission,
            name: "notifications",
            onchange: null,
            addEventListener: function () {},
            removeEventListener: function () {},
            dispatchEvent: function () {
              return true;
            },
          } as PermissionStatus);
        }
        return originalQuery.call(window.navigator.permissions, parameters);
      };
    });

    // 쿠키 설정
    if (cookie && cookie.length > 0) {
      if (validateCookie(cookie)) {
        const formattedCookies = formatCookiesForPlaywright(cookie);
        await context.addCookies(formattedCookies);
        console.log("쿠키가 성공적으로 추가됨");
      }
    }

    page = await context.newPage();

    // 랜덤 지연 시간 추가
    const randomDelay = Math.floor(Math.random() * 2000) + 1000;
    await page.waitForTimeout(randomDelay);

    await page.setDefaultTimeout(30000);
    await page.setDefaultNavigationTimeout(30000);

    // 네이버 접속
    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    await page.waitForTimeout(2000);

    return { page, browser };
  } catch (e) {
    console.error("초기화 오류:", e.message);
    if (browser) {
      await browser.close();
    }
    throw new Error("initialize failed: " + e.message);
  }
};
