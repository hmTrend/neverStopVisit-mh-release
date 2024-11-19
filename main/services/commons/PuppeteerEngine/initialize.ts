import { Browser, Page, chromium, devices } from "playwright";
import { formatCookiesForPlaywright } from "./formatCookiesForPlaywright";
import { getNextProxy } from "../../../lib/proxy/getNextProxy";
import { validateCookie } from "./validateCookie";

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
  const userAgent =
    "Mozilla/5.0 (Linux; Android 13; SM-S911N Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/102.0.5005.189 Whale/1.0.0.0 Crosswalk/27.102.0.18 Mobile Safari/537.36)/4.0 Chrome/84.0.4368.53 Mobile Safari/537.36 Maxthon/3248";
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
