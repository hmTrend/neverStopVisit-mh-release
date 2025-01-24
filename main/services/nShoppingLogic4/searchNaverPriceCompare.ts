import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export async function searchNaverPriceCompare({
  page = undefined,
  nvMid = "87533047182",
  isTest = false,
}: {
  page?: Page;
  nvMid?: string;
  isTest?: boolean;
} = {}) {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%EC%A0%84%EB%8B%B4%EC%95%A1%EC%83%81",
        cookie: "",
      });
      page = test.page;
    }
    await hasShoppingSection({ page });
    try {
      await findAndClickProduct({ page, nvMid });
    } catch (e) {
      await clickMoreButton({ page });
      for (let i = 0; i < 2; i++) {
        const pageO = await scrollWithNewItems({ page });
        try {
          await findProductByImageId({ page: pageO, nvMid });
          break;
        } catch (e) {
          console.error(e.message);
          if (i === 1) {
            throw new Error(`findProductByImageId > ${e.message}`);
          }
          await clickPageNumbers({ page, pageNumber: i + 2 });
        }
      }
      throw Error(`findAndClickProduct > ${e.message}`);
    }
  } catch (e) {
    console.error(e.message);
    throw Error(`searchNaverPriceCompare > ${e.message}`);
  }
  return { page };
}

async function hasShoppingSection({ page }) {
  const shoppingSection = page.locator("section.sp_nshop");
  if ((await shoppingSection.count()) === 0) {
    throw new Error("Shopping section not found");
  }
  console.log("this is naver shopping section");
  return true;
}

async function findAndClickProduct({ page, nvMid }) {
  const product = page.locator(`section.sp_nshop a[data-nvmid="${nvMid}"]`);
  if ((await product.count()) > 0) {
    await product.scrollIntoViewIfNeeded();
    await wait(1000);
    await product.click();
    return;
  }
  throw new Error("nvMid product not found");
}

async function clickMoreButton({ page }: { page: Page }) {
  try {
    const moreButton = page.locator("section.sp_nshop .group_more._more");
    await moreButton.scrollIntoViewIfNeeded();
    await wait(500);
    await moreButton.click();
    await page.waitForLoadState("networkidle");
    await wait(1000);
  } catch (e) {
    console.error(e.message);
    throw new Error(`clickMoreButton > ${e.message}`);
  }
}

async function findProductByImageId({
  page,
  nvMid,
}: {
  page: Page;
  nvMid: string;
}) {
  try {
    const productLink = page.locator(
      `a.product_btn_link__ArGCa[data-i="${nvMid}"]`,
    );
    if ((await productLink.count()) > 0) {
      await productLink.scrollIntoViewIfNeeded();
      await wait(1000);
      await productLink.click();
      await page.waitForLoadState("networkidle");
      await wait(1000);
      return;
    }
    throw new Error(`findProductByImageId > item not found`);
  } catch (e) {
    console.error(`findProductByImageId > ${e.message}`);
    throw new Error(`findProductByImageId > ${e.message}`);
  }
}

async function scrollWithNewItems({ page }) {
  try {
    for (let i = 0; i < 4; i++) {
      const currentCount = await page
        .locator(".product_list_item__b84TO")
        .count();
      await page.keyboard.press("End");

      try {
        await page.waitForFunction(
          (count) => {
            return (
              document.querySelectorAll(".product_list_item__b84TO").length >
              count
            );
          },
          currentCount,
          { timeout: 10 * 1000 },
        );
      } catch (err) {
        console.error("No new items loaded after scrolling");
      }
    }
    await wait(1500);
    return page;
  } catch (err) {
    console.error("Error during scrolling:", err.message);
    throw err;
  }
}

async function clickPageNumbers({ page, pageNumber }) {
  const pageBtn = page.locator(`.paginator_inner__H_LDe a`).nth(pageNumber - 1);
  await pageBtn.click();
  await page.waitForLoadState("networkidle");
  await wait(1000);
}

// searchNaverPriceCompare();
