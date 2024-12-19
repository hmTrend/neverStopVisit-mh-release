import { Browser, Page } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { validateCookie } from "./validateCookie";
import { getChromePath } from "./getChromePath";
import wait from "waait";
import { LaunchOptions } from "playwright-core";
import { getNextCreateUserAgentWithPC } from "../../../lib/network/userAgentWithPC";
import { getNextProxyDynamicProxy } from "../../../lib/proxy/getNextProxyDynamicProxy";

export const initializeForPC = async ({
  url,
  page,
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
  const proxySettings = getNextProxyDynamicProxy();
  for (let i = 0; i < 2; i++) {
    try {
      const browserOptions: LaunchOptions = {
        headless: false,
        executablePath: getChromePath({
          pathStep: i,
          isChromiumMode: true,
        }),
        ignoreDefaultArgs: ["--enable-automation"],
        args: ["--disable-blink-features=AutomationControlled"],
      };

      // type이 coupang일 경우에만 proxy 설정 추가
      if (type === "coupang") {
        browserOptions.proxy = { server: proxySettings };
      }

      browser = await chromiumEngine.launch(browserOptions);
      let getContext;
      const { context } = await createMobileContext({ browser });
      getContext = context;
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
      await page.goto(url, { waitUntil: "load" });
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
  const userAgent: any = getNextCreateUserAgentWithPC(); // 동적 user agent

  console.log("userAgent 000000");
  console.log(userAgent);
  const context = await browser.newContext({
    userAgent: userAgent.userAgent,
    extraHTTPHeaders: userAgent.headers,
  });

  return { context };
}

function extractChromeVersion(userAgent: string): string {
  const match = userAgent.match(/Chrome\/(\d+)/);
  return match ? match[1] : "112";
}
