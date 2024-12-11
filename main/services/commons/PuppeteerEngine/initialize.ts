import { Browser, Page } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { getNextProxy } from "../../../lib/proxy/getNextProxy";
import { validateCookie } from "./validateCookie";
import { getChromePath } from "./getChromePath";
import wait from "waait";
import { getNextCreateUserAgentWithDRSoftKorea241207 } from "../../../lib/network/userAgentWithDRSoftKorea";

export const initialize = async ({
  url,
  page,
  pages,
  chromiumEngine,
  cookie,
  browser,
  type = "",
}: {
  url: string;
  page: Page;
  chromiumEngine: any;
  pages: Page[];
  cookie;
  browser: Browser;
  type?: string;
}) => {
  const proxySettings = getNextProxy();
  for (let i = 0; i < 2; i++) {
    try {
      browser = await chromiumEngine.launch({
        headless: false,
        executablePath: getChromePath({
          pathStep: i,
          isChromiumMode: true,
        }),
        ignoreDefaultArgs: ["--enable-automation"],
        args: ["--disable-blink-features=AutomationControlled"],
        // proxy: { server: proxySettings },
      });
      let getContext;
      if (type === "coupang") {
        const { context } = await createMobileContext({ browser });
        getContext = context;
      } else {
        const { context } = await createMobileContext({ browser });
        getContext = context;
      }

      if (cookie && cookie.length > 0) {
        if (validateCookie(cookie)) {
          const formattedCookies = formatCookiesForPlaywright(cookie);
          await getContext.addCookies(formattedCookies);
          console.log("Cookie successfully added");
        } else {
          if (browser) {
            await browser.close();
            console.log("Browser exited due to failed cookie validation");
          }
          throw Error("Cookie validation failure ended");
        }
      }
      page = await getContext.newPage();
      await page.goto(url, { waitUntil: "networkidle" });
      await wait(1500);
      break;
    } catch (e) {
      console.log("ERR > executablePath");
      console.error(e.message);
    }
  }

  return { page, browser };
};

async function createMobileContext({ browser }: { browser: Browser }) {
  const userAgent: any = getNextCreateUserAgentWithDRSoftKorea241207(); // 동적 user agent

  console.log("userAgent 000000");
  console.log(userAgent);
  const context = await browser.newContext({
    userAgent: userAgent.userAgent,
    // userAgent:
    //   "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/605.1",
    extraHTTPHeaders: userAgent.headers,
    viewport: { width: 412, height: 915 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2.625,
  });

  return { context };
}

async function createDesktopContext({ browser }: { browser: Browser }) {
  const userAgent = {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
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
