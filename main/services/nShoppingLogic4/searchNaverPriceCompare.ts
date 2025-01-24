import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";

export async function searchNaverPriceCompare({
  page = undefined,
  targetKeyword = "가정용제빙기 미니",
  isTest = true,
}: {
  page?: Page;
  targetKeyword?: string;
  isTest?: boolean;
} = {}) {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%EA%B0%80%EC%A0%95%EC%9A%A9%EC%A0%9C%EB%B9%99%EA%B8%B0+%EB%AF%B8%EB%8B%88",
        cookie: "",
      });
      page = test.page;
    }
    await hasShoppingSection({ page });
  } catch (e) {
    console.error(e.message);
    throw Error(`searchNaverPriceCompare > ${e.message}`);
  }
  return { page };
}

searchNaverPriceCompare();

async function hasShoppingSection({ page }) {
  const shoppingSection = page.locator("section.sp_nshop");
  if ((await shoppingSection.count()) === 0) {
    throw new Error("Shopping section not found");
  }
  console.log("this is naver shopping section");
  return true;
}
