import { firefox } from "playwright";

async function openBrowser() {
  try {
    const browser = await firefox.launch({
      headless: false,
    });

    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Firefox/123.0",
      viewport: { width: 1920, height: 1080 },
    });

    const page = await context.newPage();

    // 리다이렉션 처리를 위한 설정
    await page.goto("https://www.coupang.com", {
      timeout: 60000,
      waitUntil: "networkidle",
      referer: "https://www.coupang.com/", // 레퍼러 추가
    });

    // 리다이렉션 응답 처리
    page.on("response", async (response) => {
      if (response.status() === 301 || response.status() === 302) {
        const redirectUrl = response.headers()["location"];
        if (redirectUrl) {
          console.log("리다이렉션 URL:", redirectUrl);
          await page.goto(redirectUrl, {
            waitUntil: "networkidle",
          });
        }
      }
    });
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

// openBrowser();
