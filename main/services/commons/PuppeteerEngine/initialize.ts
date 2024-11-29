import { Browser, Page, devices } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { getNextProxy } from "../../../lib/proxy/getNextProxy";
import { validateCookie } from "./validateCookie";
import { getNextCreateUserAgentWithRealMobileList } from "../../../lib/network/userAgentWithRealMobile";
import { getChromePath } from "./getChromePath";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { getNextCreateUserAgentWithProgramKoreaList } from "../../../lib/network/userAgentWithProgramKorea";
import { getNextCreateUserAgentWithAllUpMobileList } from "../../../lib/network/userAgentWithAllUpMobile";

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
  console.log("userAgent 333");
  console.log(userAgent);
  for (let i = 0; i < 2; i++) {
    try {
      chromiumEngine.use(StealthPlugin());
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
      const context = await browser.newContext({
        // userAgent: userAgent,
        userAgent:
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/27.0 Chrome/125.0.0.0 Mobile Safari/537.36",
        extraHTTPHeaders: {
          "sec-ch-ua":
            '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
        },
        viewport: { width: 412, height: 915 },
        isMobile: true,
        hasTouch: true,
      });
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
      break;
    } catch (e) {
      console.log("ERR > executablePath");
      console.error(e.message);
    }
  }

  return { page, browser };
};
