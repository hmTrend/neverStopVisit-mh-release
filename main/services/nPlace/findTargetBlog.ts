import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetBlog = async ({
  page = undefined,
  targetBlog = "https://m.blog.naver.com/lodero/223720002550",
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
        url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%EB%93%9C%EB%A6%BD%EB%B0%B1%EC%BB%A4%ED%94%BC+%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC",
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
        const link = page.locator(`a[href*="${blogId}"]`).first();
        await link.waitFor({ state: "visible", timeout: 10 * 1000 });
        await link.scrollIntoViewIfNeeded();
        await wait(1500);
        await Promise.all([
          link.click(),
          page.waitForLoadState("domcontentloaded"),
        ]);
        break;
      } catch (e) {
        if (i === 2) {
          throw new Error(`${e.message}`);
        }
        await wait(3 * 1000);
      }
    }
  } catch (e) {
    console.error(e);
    throw Error(`findTargetBlog > ${e.message}`);
  }

  return { page };
};

// findTargetBlog();
