import { Browser, Page } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { validateCookie } from "./validateCookie";
import { parseCookieString } from "./parseCookieString";
import { getChromePath } from "./getChromePath";
import wait from "waait";
import { LaunchOptions } from "playwright-core";
import { getNextProxyYoodooProxy } from "../../../lib/proxy/getNextProxyYoodooProxy";
import { getNextCreateUserAgentWithPC100percent } from "../../../lib/network/userAgentWithPC100percent";

export const initializeForPC = async ({
  url,
  page,
  chromiumEngine,
  cookie,
  browser,
  type = "",
  fingerPrintNetworkType,
}: {
  url: string;
  page: Page;
  chromiumEngine: any;
  pages: Page[];
  cookie;
  browser: Browser;
  type?: string;
  fingerPrintNetworkType: string;
}) => {
  const proxySettings = getNextProxyYoodooProxy();
  console.log("proxySettings 33111aaa");
  console.log(proxySettings);
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
      if (fingerPrintNetworkType === "YOODOOPROXY") {
        browserOptions.proxy = { server: proxySettings };
        console.log("Proxy 설정:", browserOptions.proxy);
      }

      browser = await chromiumEngine.launch(browserOptions);
      let getContext;
      const { context } = await createMobileContext({ browser });
      getContext = context;
      console.log("cookie 3311aaa");
      console.log(cookie);

      try {
        // 쿠키 처리 로직
        if (cookie) {
          let processedCookie = cookie;

          // 쿠키가 문자열인 경우 배열로 변환
          if (typeof cookie === "string") {
            console.log("쿠키가 문자열 형태입니다. 배열로 변환합니다.");
            processedCookie = parseCookieString(cookie);
            console.log("변환된 쿠키:", processedCookie);
          }

          // 배열로 변환된 쿠키 검증
          if (validateCookie(processedCookie)) {
            const formattedCookies =
              formatCookiesForPlaywright(processedCookie);
            if (formattedCookies.length > 0) {
              await getContext.addCookies(formattedCookies);
              console.log("쿠키가 성공적으로 추가되었습니다.");
            } else {
              console.log("포맷된 쿠키가 없습니다. 쿠키 없이 계속 진행합니다.");
            }
          } else {
            console.log("쿠키 검증에 실패했습니다. 쿠키 없이 계속 진행합니다.");
          }
        } else {
          console.log(
            "쿠키가 없거나 유효하지 않습니다. 쿠키 없이 계속 진행합니다.",
          );
        }
      } catch (error) {
        console.error("쿠키 처리 중 오류 발생:", error.message);
        console.log("쿠키 없이 계속 진행합니다.");
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
  const userAgent: any = getNextCreateUserAgentWithPC100percent(); // 동적 user agent

  const context = await browser.newContext({
    // userAgent: userAgent.userAgent,
    // extraHTTPHeaders: userAgent.headers,
  });

  return { context };
}

function extractChromeVersion(userAgent: string): string {
  const match = userAgent.match(/Chrome\/(\d+)/);
  return match ? match[1] : "112";
}
