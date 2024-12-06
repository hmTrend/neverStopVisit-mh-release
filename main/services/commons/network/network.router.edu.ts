import { chromium } from "playwright";
import wait from "waait";
import { getChromePath } from "../PuppeteerEngine/getChromePath";

export const networkRouterEdu = async ({ chromeHeadless = "Close" } = {}) => {
  const browser = await chromium.launch({
    headless: chromeHeadless === "Close",
    executablePath: getChromePath({
      pathStep: 0,
      isChromiumMode: true,
    }),
  });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Resource interception setup
    // await page.route("**/*", async (route) => {
    //   const request = route.request();
    //   const resourceType = request.resourceType();
    //
    //   if (resourceType === "image") {
    //     try {
    //       const response = await fetch(request.url(), { method: "HEAD" });
    //       const contentLength = response.headers.get("content-length");
    //
    //       if (contentLength) {
    //         const size = parseInt(contentLength, 10);
    //         if (size > 11 * 1024) {
    //           await route.abort();
    //           return;
    //         }
    //       }
    //       await route.continue();
    //     } catch (error) {
    //       console.error("Error checking image size:", error);
    //       await route.continue();
    //     }
    //   } else if (resourceType === "media") {
    //     console.log(`Blocked video: ${request.url()}`);
    //     await route.abort();
    //   } else {
    //     await route.continue();
    //   }
    // });

    // Locators 정의
    const locators = {
      // 비밀번호 입력 필드
      passwordInput: page.locator("#txtPwd"),
      // 또는: page.locator('//div[contains(@class, "form-group")]//input[@type="password"]'),

      // IP 변경 버튼
      ipChangeButton: page.locator('label span:has-text("변경")'),
      // 또는: page.locator('//label//span[contains(text(), "변경")]'),

      // 연결 상태 이미지
      connectedStatus: page.locator("div.status-area img"),
      // 또는: page.locator('//div[contains(@class, "status-area")]//img'),

      // 적용 버튼
      applyButton: page.locator('span:has-text("적용")').first(),
      // 또는: page.locator('//label//span//span[contains(text(), "적용")]'),

      // 로그인 버튼
      loginButton: page.locator('input[type="submit"][value="로그인"]'),
      // 또는: page.locator('//input[@type="submit" and @value="로그인"]'),

      // 메인 데이터 링크
      mainDataLink: page.locator("div.main-content a"),
      // 또는: page.locator('//div[contains(@class, "main-content")]//a'),
    };
    await page.goto("http://192.168.8.1/index.html#band", {
      waitUntil: "domcontentloaded",
      timeout: 120 * 1000,
    });
    await wait(3 * 1000);
    const finalUrl = page.url();
    console.log("finalUrl 333222");
    console.log(finalUrl);
    // 비밀번호 입력 또는 IP 변경 버튼 대기
    const isPassVisible = await page
      .waitForSelector("#txtPwd", {
        state: "visible", // visible 대신 state: 'visible' 사용
        timeout: 3000,
      })
      .then(() => true)
      .catch(() => false);
    if (isPassVisible) {
      // 비밀번호 입력
      await locators.passwordInput.fill("12345678");
      await Promise.all([
        locators.loginButton.click(),
        page.waitForLoadState("domcontentloaded"),
      ]);
      console.log(111);
      // 페이지 새로고침
      await page.goto("http://192.168.8.1/index.html#band", {
        waitUntil: "domcontentloaded",
        timeout: 120 * 1000,
      });
      console.log(222);
    }
    await locators.applyButton.waitFor({ state: "visible" });
    await locators.applyButton.click();
    // 메인 페이지로 이동
    await page.goto("http://192.168.8.1/index.html#home", {
      waitUntil: "domcontentloaded",
    });
    console.log(3);
    await page.waitForSelector("span#wifi_status img", {
      state: "visible",
      timeout: 90 * 1000,
    });
    console.log(4);
    // 리소스 정리
    await wait(3000);
    await context.close();
    await browser.close();

    return { message: "Edu Router Connect SUCCESS" };
  } catch (e) {
    console.error(e.message);
    await browser.close();
    throw new Error("ERR > Edu Router Connect");
  }
};

// Locator 유틸리티 함수들
const utils = {
  // 요소가 클릭 가능할 때까지 대기 후 클릭
  async clickWhenReady(locator: any) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  },

  // 요소가 나타날 때까지 대기
  async waitForVisible(locator: any, timeout = 5000) {
    try {
      await locator.waitFor({
        state: "visible",
        timeout,
      });
      return true;
    } catch {
      return false;
    }
  },

  // 안전한 입력 (여러 방법 시도)
  async safeType(page: any, locator: any, text: string) {
    try {
      await locator.click();
      await page.keyboard.type(text, { delay: 100 });
    } catch {
      try {
        await locator.fill(text);
      } catch {
        await page.evaluate(
          ([selector, value]) => {
            const element = document.querySelector(
              selector,
            ) as HTMLInputElement;
            if (element) {
              element.value = value;
              element.dispatchEvent(new Event("input"));
              element.dispatchEvent(new Event("change"));
            }
          },
          [locator, text],
        );
      }
    }
  },
};
