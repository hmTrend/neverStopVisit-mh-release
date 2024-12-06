import { Browser, Page } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { getNextProxy } from "../../../lib/proxy/getNextProxy";
import { validateCookie } from "./validateCookie";
import { getChromePath } from "./getChromePath";
import { getNextCreateUserAgentWithAllUpMobileList } from "../../../lib/network/userAgentWithAllUpMobile";
import { getNextCreateUserAgentWithRealMobileList } from "../../../lib/network/userAgentWithRealMobile";
import wait from "waait";

export const initialize = async ({
  url,
  page,
  pages,
  chromiumEngine,
  cookie,
  browser,
}: {
  url: string;
  page: Page;
  chromiumEngine: any;
  pages: Page[];
  cookie;
  browser: Browser;
}) => {
  const proxySettings = getNextProxy();
  const userAgent = getNextCreateUserAgentWithAllUpMobileList();
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

      const { context } = await createMobileContext({ browser });

      if (cookie && cookie.length > 0) {
        if (validateCookie(cookie)) {
          const formattedCookies = formatCookiesForPlaywright(cookie);
          await context.addCookies(formattedCookies);
          console.log("쿠키가 성공적으로 추가됨");
        } else {
          if (browser) {
            await browser.close();
            console.log("쿠키 검증 실패로 브라우저가 종료됨");
          }
          throw Error("쿠키 검증 실패");
        }
      }
      page = await context.newPage();
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
  const userAgent = getNextCreateUserAgentWithRealMobileList(); // 동적 user agent
  const chromeVersion = extractChromeVersion(userAgent);

  const context = await browser.newContext({
    userAgent: userAgent,
    extraHTTPHeaders: {
      "sec-ch-ua": `"Not A(Brand";v="99", "Google Chrome";v="${chromeVersion}", "Chromium";v="${chromeVersion}"`,
      "sec-ch-ua-platform": '"Android"',
      "sec-ch-ua-mobile": "?1",
    },
    viewport: { width: 412, height: 915 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2.625,
  });

  return { context };
}

function extractChromeVersion(userAgent: string): string {
  const match = userAgent.match(/Chrome\/(\d+)/);
  return match ? match[1] : "112";
}
