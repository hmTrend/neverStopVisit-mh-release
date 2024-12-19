import { Page } from "playwright";
import { PuppeteerEngine } from "../commons/PuppeteerEngine";
import wait from "waait";

export async function clickNearbyAttractions({
  page,
  isTest = false,
}: {
  page?: Page;
  isTest?: boolean;
} = {}) {
  try {
    if (isTest) {
      const test = new PuppeteerEngine();
      await test.initialize({
        url: "https://m.place.naver.com/restaurant/13124988/home?entry=pll",
        cookie: "",
      });
      page = test.page;
    }
    {
      const link = page.getByRole("tab").filter({ hasText: "주변" });
      await link.waitFor({ state: "visible", timeout: 5000 });
      await Promise.all([link.click(), page.waitForLoadState("load")]);
    }
    await wait(1500);
    {
      const button = page.getByRole("button", { name: "명소", exact: true });
      await button.waitFor({ state: "visible", timeout: 5000 });
      await Promise.all([button.click(), page.waitForLoadState("load")]);
    }
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("ERR > clickNearbyAttractions");
  }
}

// clickNearbyAttractions();
