import wait from "waait";
import puppeteer from "puppeteer-core";
import { getChromePath } from "../playwright/getChromPath";

export const networkRouterEdu = async ({ chromeHeadless = "Open" } = {}) => {
  const browser = await puppeteer.launch({
    headless: chromeHeadless.includes("Close") ? true : false,
    ignoreDefaultArgs: ["--disable-extensions"],
    defaultViewport: null,
    executablePath: getChromePath(),
  });
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on("request", (request) => {
      if (request.resourceType() === "image") request.abort();
      else request.continue();
    });

    await page.goto("http://192.168.8.1/index.html#band");
    const passwordXpath =
      "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div/div/div[2]/div/form[1]/div[3]/div/input')";

    const ipChangeXpath =
      "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/form/div/div/div[3]/label/span')";

    const passwordElement = page.waitForSelector(passwordXpath, {
      timeout: 121000,
    });
    const isPasswordElement = passwordElement.then(() => "passwordElement");

    const ipChangeElement = page.waitForSelector(ipChangeXpath, {
      timeout: 121000,
    });
    const isIpChangeElement = ipChangeElement.then(() => "ipChangeElement");

    const result = await Promise.race([isPasswordElement, isIpChangeElement]);
    const 연결됨 =
      "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div[1]/div/div[3]/div/label')";
    const 적용 =
      "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/form/div/div/div[3]/label/span/span')";
    console.log(result);
    if (result === "passwordElement") {
      await page.type(passwordXpath, "12345678");
      await page.click(
        "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div/div/div[2]/div/form[1]/div[4]/div[2]/input')",
      );
      await page.waitForSelector(연결됨, { timeout: 121000 });
      await page.goto("http://192.168.8.1/index.html#band");
    }
    await page.waitForSelector(적용, { timeout: 121000 });
    await page.click(적용);
    await page.goto("http://192.168.8.1/");
    const mainDataLinkButton =
      "xpath=//html/body/div/div/div[1]/div[2]/div/div/div[1]/div/div[4]/a";
    await page.waitForSelector(mainDataLinkButton, { timeout: 121000 });
    await browser.close();
    await wait(2000);
    return { message: "Edu Router Connect SUCCESS" };
  } catch (e) {
    console.error(e.message);
    await browser.close();
    return { message: "" };
  }
};

// networkRouterEdu()
// const test = new RouterIpChanger();
// test.startRouterChanger();

networkRouterEdu();
