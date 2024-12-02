import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetBlog = async ({
  page = undefined,
  targetBlog = "https://m.blog.naver.com/summr1213/223632753687",
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
        url: "https://m.search.naver.com/search.naver?sm=tab_hty.top&where=m&ssc=tab.m.all&query=%EC%B9%98%EC%8A%A4%ED%83%80%EB%A6%AC%EC%97%90+%EA%B0%95%EB%82%A8%EC%97%AD%EC%A0%90&oquery=%EA%B8%B0%EC%9E%A5%EA%B5%90%ED%86%B5%EC%82%AC%EA%B3%A0%ED%95%9C%EC%9D%98%EC%9B%90&tqi=i02IAsqo1SCsscDsTyNssssstw8-478383",
        cookie: "",
      });
      page = test.page;
    }

    try {
      await page.evaluate((url) => {
        const links = Array.from(document.querySelectorAll("a"));
        const targetLink = links.find((link) => link.href.includes(url));
        if (targetLink) targetLink.click();
        else throw new Error("링크를 찾을 수 없습니다");
      }, targetBlog);
      await page.waitForLoadState("networkidle");
    } catch (error) {
      throw new Error(
        `findTargetBlog > "${targetBlog}" 링크를 찾을 수 없습니다.`,
      );
    }
  } catch (e) {
    console.error(e);
    throw Error("ERR > findTargetBlog");
  }

  return { page };
};

findTargetBlog();
