import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export const findTargetBlogLogic4 = async ({
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
        // url: "https://m.search.naver.com/search.naver?sm=mtb_hty.top&where=m&ssc=tab.m.all&oquery=%EB%93%9C%EB%A6%BD%EB%B0%B1%EC%BB%A4%ED%94%BC+%EB%AC%B8%EC%A0%9C%EC%A0%81%EC%BB%A4%ED%94%BC&tqi=iGu6Clpr4K8ssvyThGwssssssCs-010368&query=%EA%B0%95%EB%82%A8%EA%B0%80%EA%B5%AC%EC%A0%90",
        cookie: "",
      });
      page = test.page;
    }

    const hasPopular = await hasPopularPost(page);
    if (hasPopular) {
      console.log("this is popular post");
      const hasPopularBlog = await hasPopularBlogPost(page, targetBlog);
      if (hasPopularBlog) {
        console.log("this is popular blog post");
        return { page };
      }
      await page.locator(':text("인기글 더보기")').scrollIntoViewIfNeeded();
      await wait(1000);
      await Promise.all([
        page.locator(':text("인기글 더보기")').click(),
        page.waitForLoadState("load"),
      ]);
      await wait(1000);
      const hasPopularBlogMore = await hasPopularBlogPostMorePage(
        page,
        targetBlog,
      );
      if (!hasPopularBlogMore) {
        throw new Error("this is NOT hasPopularBlogMore");
      }
      console.log("this is popular blog post > hasPopularBlogMore");
      return { page };
    }
    await blogTabClick(page);
    const hasBlogTabBlogUrl = await hasPopularBlogPostMorePage(
      page,
      targetBlog,
    );
    if (!hasBlogTabBlogUrl) {
      throw new Error("this is NOT hasBlogTabBlogUrl");
    }
    console.log("this is popular blog post > hasBlogTabBlogUrl");
    return { page };
  } catch (e) {
    console.error(e);
    throw Error(`findTargetBlog > ${e.message}`);
  }
};

// findTargetBlogLogic4();

async function hasPopularPost(page: Page): Promise<boolean> {
  try {
    const titles = await page.locator("h2.title").allTextContents();
    return titles.some((title) => title.includes("인기글"));
  } catch (error) {
    console.error("Error Checking Popular Posts:", error.message);
    return false;
  }
}

async function hasPopularBlogPost(
  page: Page,
  targetBlogUrl: string,
): Promise<boolean> {
  try {
    // sp_nreview 섹션 내의 특정 블로그 링크 확인
    const reviewSection = page.locator("section.sp_nreview");
    const blogLinks = reviewSection
      .locator(`a[href*="${targetBlogUrl}"]`)
      .first();

    // 링크 존재 여부 반환
    const count = await blogLinks.count();
    if (count > 0) {
      console.log("this is popular blog post count > 0");
      await blogLinks.scrollIntoViewIfNeeded();
      await wait(1500);
      await Promise.all([blogLinks.click(), page.waitForLoadState("load")]);
    }
    return count > 0;
  } catch (error) {
    console.error("Error checking blog in review section:", error);
    return false;
  }
}

async function hasPopularBlogPostMorePage(
  page: Page,
  targetBlogUrl: string,
): Promise<boolean> {
  try {
    const blogLinks = page.locator(`a[href*="${targetBlogUrl}"]`).first();

    // 링크 존재 여부 반환
    const count = await blogLinks.count();
    if (count > 0) {
      console.log("this is popular blog post count > 0");
      await blogLinks.scrollIntoViewIfNeeded();
      await wait(1500);
      await Promise.all([blogLinks.click(), page.waitForLoadState("load")]);
    }
    return count > 0;
  } catch (error) {
    console.error("Error checking blog in review section:", error);
    return false;
  }
}

async function blogTabClick(page: Page) {
  await wait(1000);
  const blogTab = page.locator("div.flick_bx a.tab:has(i.ico_nav_blog)");
  await blogTab.waitFor({ state: "visible", timeout: 60 * 1000 });
  await Promise.all([blogTab.click(), page.waitForLoadState("load")]);
  await wait(1000);
}
