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

    try {
      await wait(1000);
      const link = page.locator(`[href="${targetBlog}"]`).first();
      await link.waitFor({ state: "visible", timeout: 5000 });
      await Promise.all([link.click(), page.waitForLoadState("networkidle")]);
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

// findTargetBlog();
