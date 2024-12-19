import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetBlog = async ({
  page = undefined,
  targetBlog = "https://m.blog.naver.com/me_ong_/223540312584",
  isTest = false,
}: {
  page?: Page;
  targetBlog?: string;
  isTest?: boolean;
} = {}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&ssc=tab.m.all&oquery=%EA%B0%95%EB%82%A8%EB%A7%9B%EC%A7%91+%EC%B9%98%EC%8A%A4%ED%83%80%EB%A6%AC%EC%97%90&tqi=i03c%2FdprfAlssDuT3clssssstiG-455837&query=%EA%B0%95%EB%82%A8%EC%97%AD%EB%A7%9B%EC%A7%91+%EC%B9%98%EC%8A%A4%ED%83%80%EB%A6%AC%EC%97%90",
        cookie: "",
      });
      page = test.page;
    }
    const getBlogId = (url: string) => {
      // 마지막 '/' 이후의 숫자만 추출
      const match = url.match(/\/(\d+)$/);
      return match ? match[1] : "";
    };
    for (let i = 0; i < 3; i++) {
      try {
        await wait(1000);
        const blogId = getBlogId(targetBlog);
        const link = page.locator(`[href$="${blogId}"]`).first();
        await link.waitFor({ state: "visible", timeout: 5 * 1000 });
        await link.scrollIntoViewIfNeeded();
        await wait(1000);
        await Promise.all([link.click(), page.waitForLoadState("load")]);
        break;
      } catch (e) {
        if (i === 2) {
          throw new Error(`${e.message}`);
        }
      }
    }
  } catch (e) {
    console.error(e);
    throw Error(`findTargetBlog > ${e.message}`);
  }

  return { page };
};

// findTargetBlog();
