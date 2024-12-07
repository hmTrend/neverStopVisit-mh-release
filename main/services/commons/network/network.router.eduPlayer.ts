import { chromium, Page } from "playwright";
import { expect } from "playwright/test";
import { getChromePath } from "../PuppeteerEngine/getChromePath";

export const networkRouterEduPlayer = async () => {
  const { page: page1 } = await playwrightEngineStart();
  const { isLogged, page } = await isLoggedCheck({ page: page1 });
  console.log("isLogged");
  console.log(isLogged);
};

async function playwrightEngineStart() {
  const browser = await chromium.launch({
    headless: false,
    executablePath: getChromePath({
      pathStep: 0,
      isChromiumMode: true,
    }),
  });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://192.168.8.1/index.html#band", {
      waitUntil: "domcontentloaded",
      timeout: 120 * 1000,
    });
    return { page };
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
    timeout: 30 * 1000, // 10초 타임아웃
  });
}

async function waitForLoggedCheckWithLogOut({ page }) {
  await page.waitForSelector('span[data-trans="home"]', {
    state: "visible",
    timeout: 30 * 1000, // 10초 타임아웃
  });
}

networkRouterEduPlayer();
