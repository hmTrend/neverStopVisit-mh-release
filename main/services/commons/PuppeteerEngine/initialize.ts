import { Browser, Page } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { validateCookie } from "./validateCookie";
import { getChromePath } from "./getChromePath";
import wait from "waait";
import { getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent } from "../../../lib/network/userAgentWithDRSoftKoreaWithOutIPhoneIN100percent";

export const initialize = async ({
  url,
  page,
  pages,
  chromiumEngine,
  cookie,
  browser,
  type = "",
  networkSpeed = "LTE",
}: {
  url: string;
  page: Page;
  chromiumEngine: any;
  pages: Page[];
  cookie;
  browser: Browser;
  type?: string;
  networkSpeed?: "LTE" | "3G";
}) => {
  let nowUserAgent;
  for (let i = 0; i < 3; i++) {
    try {
      browser = await chromiumEngine.launch({
        headless: false,
        executablePath: getChromePath({
          pathStep: i,
          isChromiumMode: true,
        }),
        ignoreDefaultArgs: ["--enable-automation"],
        args: ["--disable-blink-features=AutomationControlled"],
      });
      let getContext;
      const { context, userAgent } = await createMobileContext({ browser });
      getContext = context;
      nowUserAgent = userAgent;
      if (cookie && cookie.length > 0) {
        if (validateCookie(cookie)) {
          const formattedCookies = formatCookiesForPlaywright(cookie);
          await getContext.addCookies(formattedCookies);
          console.log("Cookie successfully added");
        } else {
          throw Error("Cookie validation failure ended");
        }
      }
      page = await getContext.newPage();

      // if (networkSpeed === "3G") {
      const client = await context.newCDPSession(page);
      await client.send("Network.enable");
      await client.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 100, // 지연시간 (ms)
        downloadThroughput: (750 * 1024) / 8, // bytes/s
        uploadThroughput: (250 * 1024) / 8, // bytes/s
      });
      // }

      await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 120 * 1000,
      });
      await wait(1500);
      break;
    } catch (e) {
      if (browser) {
        await browser.close(); // 에러 발생 시 브라우저 닫기
      }
      console.log("ERR > executablePath");
      console.error(e.message);
      if (i === 2) {
        throw Error("Cookie validation failure ended");
      }
    }
  }
  return { page, browser, userAgent: nowUserAgent };
};

async function createMobileContext({
  browser,
}: {
  browser: Browser;
  networkSpeed?: string;
}) {
  const userAgent: any =
    getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent(); // 동적 user agent

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

async function createDesktopContext({ browser }: { browser: Browser }) {
  const userAgent = {
    // userAgent:
    //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    userAgent:
      "Mozilla/5.0 (Linux; Android 14; SM-S921N Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.6778.39 Mobile Safari/537.36 coupangapp/1.0",
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua":
        '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
  };

  console.log("userAgent PC");
  console.log(userAgent);

  const context = await browser.newContext({
    userAgent: userAgent.userAgent,
    extraHTTPHeaders: userAgent.headers,
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
  });

  return { context };
}

function extractChromeVersion(userAgent: string): string {
  const match = userAgent.match(/Chrome\/(\d+)/);
  return match ? match[1] : "112";
}
