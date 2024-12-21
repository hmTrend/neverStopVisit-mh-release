import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetBlog = async ({
  page = undefined,
  targetBlog = "https://m.blog.naver.com/minidaoyou/223627474798",
  isTest = true,
}: {
  page?: Page;
  targetBlog?: string;
  isTest?: boolean;
} = {}) => {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%ED%99%8D%EB%8C%80%EB%A7%9B%EC%A7%91+%EA%B3%A0%EC%97%94",
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
        await Promise.all([link.click(), page.waitForLoadState("load")]);
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

findTargetBlog();
