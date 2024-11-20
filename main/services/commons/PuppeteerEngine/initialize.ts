import { Browser, Page, chromium, devices } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { getNextProxy } from "../../../lib/proxy/getNextProxy";
import { validateCookie } from "./validateCookie";
import { getNextCreateUserAgentWithRealMobileList } from "../../../lib/network/userAgentWithRealMobile";

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
  chromiumEngine: typeof chromium;
  pages: Page[];
  cookie;
  browser: Browser;
}) => {
  const proxySettings = getNextProxy();
  const userAgent = getNextCreateUserAgentWithRealMobileList();
  browser = await chromiumEngine.launch({
    headless: false,
    // proxy: { server: proxySettings },
  });
  const context = await browser.newContext({
    userAgent: userAgent,
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
    const formattedCookies = formatCookiesForPlaywright(cookie);
    await context.addCookies(formattedCookies);
  }
  page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  return { page, browser };
};
