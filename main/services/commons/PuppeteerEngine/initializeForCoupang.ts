import { firefox, Browser, BrowserContext } from "playwright";

// Firefox 브라우저 생성 함수
async function createFirefoxBrowser() {
  const browser = await firefox.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  return browser;
}

// Firefox Context 생성 함수
async function createFirefoxContext({
  browser,
}: {
  browser: Browser;
}): Promise<{ context: BrowserContext }> {
  const userAgent = {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0",
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
    },
  };

  console.log("coupang UserAgent");
  console.log(userAgent);

  const context = await browser.newContext({
    userAgent: userAgent.userAgent,
    extraHTTPHeaders: userAgent.headers,
    viewport: null,
    deviceScaleFactor: 1,
    hasTouch: false,
  });

  return { context };
}

// 사용 예시
async function example() {
  try {
    const browser = await createFirefoxBrowser();
    const { context } = await createFirefoxContext({ browser });
    const page = await context.newPage();

    // 페이지 접속 등 작업 수행
    await page.goto("https://example.com", {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // 작업 완료 후 리소스 정리
    await context.close();
    await browser.close();
  } catch (error) {
    console.error("Error:", error);
  }
}

export { createFirefoxBrowser, createFirefoxContext };
