import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";

export const findTargetBlog = async ({
  page = undefined,
  targetBlog = "강남역 신논현역 파스타 치킨 맛집 “치스타리에 강남역점”",
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
        url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%EA%B0%95%EB%82%A8%EB%A7%9B%EC%A7%91+%EC%B9%98%EC%8A%A4%ED%83%80%EB%A6%AC%EC%97%90+%EA%B0%95%EB%82%A8%EC%97%AD%EC%A0%90",
        cookie: "",
      });
      page = test.page;
    }

    try {
      const link = page.locator(`a:has-text("${targetBlog}")`);

      // 링크가 있는지 확인하고 클릭
      await link.waitFor({ state: "visible", timeout: 5000 });
      await Promise.all([
        page.waitForLoadState("networkidle"),
        await link.click(),
      ]);
    } catch (error) {
      throw new Error(`"${targetBlog}" 링크를 찾을 수 없습니다.`);
    }
  } catch (e) {
    console.error(e.message);
    throw Error("ERR > targetKeywordSearch");
  }

  return { page };
};

// findTargetBlog();
