import { Page } from "playwright";
import wait from "waait";
import { PuppeteerEngine } from "../PuppeteerEngine";

export const googleToNaver = async ({
  page = undefined,
  isTest = false,
}: {
  page?: Page;
  isTest?: boolean;
} = {}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://www.google.com/",
        cookie: "",
      });
      page = test.page;
    }

    await inputTypeCheck({ page });

    // Enter 키 입력 후 navigation 대기
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }), // networkidle 대신 load 사용
      page.keyboard.press("Enter"),
    ]);

    // 네이버 링크 클릭 후 navigation 대기
    await Promise.all([
      page.waitForNavigation({
        waitUntil: "domcontentloaded",
        timeout: 60 * 1000,
      }),
      page.locator('a[href="https://www.naver.com/"]').first().click(),
    ]);

    return { page };
  } catch (e) {
    throw new Error(`googleToNaver ${e.message}`);
  }
};

async function inputTypeCheck({ page }) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // 두 input 요소에 대한 Promise 생성
      const textareaPromise = page
        .waitForSelector("textarea.gLFyf")
        .then((element) => ({ type: "textarea", element }))
        .catch(() => null);

      const mibPromise = page
        .waitForSelector("#mib")
        .then((element) => ({ type: "mib", element }))
        .catch(() => null);

      // Promise.race로 먼저 나타나는 요소 찾기
      const result = await Promise.race([textareaPromise, mibPromise]);

      if (result) {
        console.log(`Found ${result.type} input on attempt ${attempt}`);
        await result.element.click();
        await wait(500);
        await result.element.type("네이버", { delay: 300 });
        await wait(1000);
        break; // 성공하면 루프 종료
      } else {
        throw new Error("No search input found");
      }
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt === MAX_RETRIES) {
        console.error("Max retries reached. Operation failed.");
        throw error; // 최대 시도 횟수 도달 시 에러 발생
      }

      // 다음 시도 전 잠시 대기 (지연 시간을 점진적으로 증가)
      await page.waitForTimeout(1000 * attempt);
    }
  }
}

// googleToNaver();
