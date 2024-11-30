import { Browser, Page } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { getNextProxy } from "../../../lib/proxy/getNextProxy";
import { validateCookie } from "./validateCookie";
import { getChromePath } from "./getChromePath";
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
      const context = await browser.newContext({
        userAgent:
          "Mozilla/5.0 (Linux; U; Android 11; ru-ru; Mi 9T Pro Build/RKQ1.200826.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/112.0.5615.136 Mobile Safari/537.36 XiaoMi/MiuiBrowser/14.10.1-gn",
        extraHTTPHeaders: {
          "sec-ch-ua": '"Chromium";v="112", "Google Chrome";v="112"',
          "sec-ch-ua-platform": '"Android"',
          "sec-ch-ua-mobile": "?1",
        },
        viewport: { width: 412, height: 915 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2.625, // 모바일 디바이스의 스케일 팩터 추가
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
