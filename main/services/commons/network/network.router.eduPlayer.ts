import { chromium, Page } from "playwright";
import { expect } from "playwright/test";
import { getChromePath } from "../PuppeteerEngine/getChromePath";

export const networkRouterEduPlayer = async () => {
  const { page: page1, browser } = await playwrightEngineStart();
  const { isLogged, page: page2 } = await isLoggedCheck({ page: page1 });
  const { page: page3 } = await doLogin({ page: page2, isLogged });
  await bandModeChangeAccept({ page: page3 });
  await goToIndexPage({ page: page3 });
  console.log("isLogged");
  console.log(isLogged);
  await browser.close();
};

async function playwrightEngineStart() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: getChromePath({
      pathStep: 0,
      isChromiumMode: true,
    }),
  });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://192.168.8.1/index.html#band", {
      waitUntil: "load",
      timeout: 120 * 1000,
    });
    return { page, browser };
  } catch (e) {
    console.log("ERR > executablePath");
    console.error(e.message);
  }
}

async function isLoggedCheck({ page }: { page: Page }) {
  console.log(1);
  let isLogOut: any;
  const logoutElement = page.locator("#logoutlink");
  await waitForLoggedCheckWithLogOut({ page });
  if ((await logoutElement.count()) > 0) {
    const style = await logoutElement.getAttribute("style");
    // 직접 문자열 포함 여부 확인
    isLogOut = style?.includes("display: none") || false;
  } else {
    console.log("Logout element does not exist in HTML");
  }

  return { page, isLogged: !isLogOut };
}

async function waitForLastImageWithLogIn({ page }) {
  await page.waitForSelector('img[src="./img_mifi/unread_message.gif"]', {
    state: "visible",
    timeout: 90 * 1000, // 10초 타임아웃
  });
}

async function waitForLoggedCheckWithLogOut({ page }) {
  await page.waitForSelector('span[data-trans="home"]', {
    state: "visible",
    timeout: 90 * 1000, // 10초 타임아웃
  });
}

async function doLogin({ page, isLogged }: { page: Page; isLogged: boolean }) {
  try {
    if (isLogged) {
      return { page };
    }
    const passwordInput = page.locator("#txtPwd");
    // 입력 필드가 보일 때까지 대기
    await passwordInput.waitFor({ state: "visible", timeout: 10000 });
    // 비밀번호 입력
    await passwordInput.fill("12345678");
    // Enter 키 입력
    await passwordInput.press("Enter");
    console.log("Password entered and submitted");
    await waitForLastImageWithLogIn({ page });
    await page.goto("http://192.168.8.1/index.html#band", {
      waitUntil: "domcontentloaded",
      timeout: 120 * 1000,
    });
    await waitForLastImageWithLogIn({ page });
  } catch (error) {
    console.log("Password input field not found or error occurred:", error);
  }
  return { page };
}

async function bandModeChangeAccept({ page }: { page: Page }) {
  await waitForLastImageWithLogIn({ page });
  try {
    const applyButton = page.locator('span[data-trans="apply"]');
    await applyButton.click();
    await signalModeStateCheck({ page });
  } catch (error) {
    console.log("Apply button not found or click failed:", error);
  }
}

async function signalModeStateCheck({ page }: { page: Page }) {
  try {
    const signalMode = page.locator("#signalMode");

    // 초기값이 'LTE'인지 확인
    const initialText = await signalMode.textContent();
    console.log("Initial signal mode:", initialText);

    // 값이 'LTE'가 아닌 다른 값으로 변경되기를 기다림
    await page.waitForFunction(
      (selector) => document.querySelector(selector)?.textContent !== "LTE",
      "#signalMode",
      { timeout: 30000 },
    );

    const changedText = await signalMode.textContent();
    console.log("Signal mode changed to:", changedText);

    // 다시 'LTE'로 돌아오기를 기다림
    await page.waitForFunction(
      (selector) => document.querySelector(selector)?.textContent === "LTE",
      "#signalMode",
      { timeout: 30000 },
    );

    const finalText = await signalMode.textContent();
    console.log("Signal mode returned to:", finalText);

    return true;
  } catch (error) {
    console.log("Error while waiting for signal mode change:", error);
    return false;
  }
}

async function goToIndexPage({ page }: { page: Page }) {
  await page.goto("http://192.168.8.1/index.html", {
    waitUntil: "domcontentloaded",
    timeout: 120 * 1000,
  });
  await waitForLastImageWithLogIn({ page });
}

// networkRouterEduPlayer();
