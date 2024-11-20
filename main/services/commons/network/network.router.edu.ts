import { chromium } from "playwright";
import wait from "waait";

export const networkRouterEdu = async ({ chromeHeadless = "Close" }) => {
  const browser = await chromium.launch({
    headless: chromeHeadless.includes("Close"),
  });

  for (let i = 0; i < 5; i++) {
    try {
      const context = await browser.newContext();
      const page = await context.newPage();

      // Setup route handler for resource interception
      await page.route("**/*", async (route) => {
        const request = route.request();
        const resourceType = request.resourceType();

        if (resourceType === "image") {
          try {
            const response = await fetch(request.url(), { method: "HEAD" });
            const contentLength = response.headers.get("content-length");

            if (contentLength) {
              const size = parseInt(contentLength, 10);
              if (size > 11 * 1024) {
                // Block images larger than 11KB
                await route.abort();
                return;
              }
            }
            await route.continue();
          } catch (error) {
            console.error("Error checking image size:", error);
            await route.continue();
          }
        } else if (resourceType === "media") {
          // Block all video requests
          console.log(`Blocked video: ${request.url()}`);
          await route.abort();
        } else {
          await route.continue();
        }
      });

      await page.goto("http://192.168.8.1/index.html#band");

      // Define selectors
      const passwordSelector =
        "/html/body/div/div/div[1]/div[2]/div/div/div/div/div[2]/div/form[1]/div[3]/div/input";
      const ipChangeSelector =
        "/html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/form/div/div/div[3]/label/span";
      const connectedSelector =
        "/html/body/div/div/div[1]/div[1]/div/div/div[3]/div/span[6]/img";
      const applySelector =
        "/html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/form/div/div/div[3]/label/span/span";

      // Wait for either password input or IP change element
      const [passwordElement, ipChangeElement] = await Promise.all([
        page.waitForSelector(passwordSelector).catch(() => null),
        page.waitForSelector(ipChangeSelector).catch(() => null),
      ]);

      if (passwordElement) {
        await page.fill(passwordSelector, "12345678");
        await page.click(
          "/html/body/div/div/div[1]/div[2]/div/div/div/div/div[2]/div/form[1]/div[4]/div[2]/input",
        );
        await page.waitForSelector(connectedSelector);
        await page.goto("http://192.168.8.1/index.html#band");
      }

      await page.waitForSelector(applySelector);
      await page.click(applySelector);
      await page.goto("http://192.168.8.1/");

      const mainDataLinkSelector =
        "//html/body/div/div/div[1]/div[2]/div/div/div[1]/div/div[4]/a";
      await page.waitForSelector(mainDataLinkSelector);

      await context.close();
      await browser.close();
      await wait(2000);
      return { message: "Edu Router Connect SUCCESS" };
    } catch (e) {
      console.error(e.message);
      await browser.close();
      throw new Error("ERR > Edu Router Connect");
    }
  }
};
