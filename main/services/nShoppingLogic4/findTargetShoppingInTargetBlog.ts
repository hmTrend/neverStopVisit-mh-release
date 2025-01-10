import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetShoppingInTargetBlog = async ({
  page = undefined,
  targetPlace = "1760267682",
  isTest = false,
}: {
  page?: Page;
  targetPlace?: string;
  isTest?: boolean;
} = {}) => {
  if (isTest) {
    const test = new PuppeteerEngine();
    await test.initialize({
      url: "https://m.blog.naver.com/lodero/223720002550",
      cookie: "",
    });
    page = test.page;
  }

  try {
    await wait(1000);
    const storeLink = page
      .locator("a", {
        has: page.locator('p.se-oglink-url:text("smartstore.naver.com")'),
      })
      .first();

    await wait(1000);
    if ((await storeLink.count()) > 0) {
      console.log("this is naver shopping link");
      await storeLink.click();
    }
    console.log("naver shopping link not found");
  } catch (e) {
    console.error(e.message);
    throw Error(`findTargetPlaceInTargetBlog > ${e.message}`);
  }
  return { page };
};

// findTargetShoppingInTargetBlog();
