import wait from "waait";

export const networkRouterEdu = async ({
  chromeHeadless = "Close",
}) => {
  const browser = await puppeteer.launch({
    headless: chromeHeadless.includes("Close") ? true : false,
    ignoreDefaultArgs: ["--disable-extensions"],
    defaultViewport: null,
    executablePath: getChromePath(),
  });
  for (let i = 0; i < 5; i++) {
    try {
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on("request", async (request) => {
        const resourceType = request.resourceType();

        if (resourceType === "image") {
          try {
            // HEAD 요청을 사용하여 Content-Length 확인
            const response = await fetch(request.url(), { method: "HEAD" });
            const contentLength = response.headers.get("content-length");

            if (contentLength) {
              const size = parseInt(contentLength, 10);
              if (size > 11 * 1024) {
                // 11KB 초과
                await request.abort();
              } else {
                await request.continue();
              }
            } else {
              // Content-Length를 얻을 수 없는 경우, 허용
              await request.continue();
            }
          } catch (error) {
            console.error("Error checking image size:", error);
            await request.continue(); // 오류 발생 시 기본적으로 허용
          }
        } else if (resourceType === "media") {
          // 모든 동영상 요청 차단
          console.log(`Blocked video: ${request.url()}`);
          await request.abort();
        } else {
          await request.continue();
        }
      });

      await page.goto("http://192.168.8.1/index.html#band");
      const passwordXpath =
        "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div/div/div[2]/div/form[1]/div[3]/div/input')";
      const ipChangeXpath =
        "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/form/div/div/div[3]/label/span')";

      const passwordElement = page.waitForSelector(passwordXpath);
      const isPasswordElement = passwordElement.then(() => "passwordElement");
      const ipChangeElement = page.waitForSelector(ipChangeXpath);
      const isIpChangeElement = ipChangeElement.then(() => "ipChangeElement");

      const result = await Promise.race([isPasswordElement, isIpChangeElement]);
      const 연결됨 =
        "::-p-xpath('/html/body/div/div/div[1]/div[1]/div/div/div[3]/div/span[6]/img')";
      const 적용 =
        "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div/div[2]/div[2]/form/div/div/div[3]/label/span/span')";
      if (result === "passwordElement") {
        await page.type(passwordXpath, "12345678");
        await page.click(
          "::-p-xpath('/html/body/div/div/div[1]/div[2]/div/div/div/div/div[2]/div/form[1]/div[4]/div[2]/input')",
        );
        await page.waitForSelector(연결됨);
        await page.goto("http://192.168.8.1/index.html#band");
      }
      await page.waitForSelector(적용);
      await page.click(적용);
      await page.goto("http://192.168.8.1/");
      const mainDataLinkButton =
        "xpath=//html/body/div/div/div[1]/div[2]/div/div/div[1]/div/div[4]/a";
      await page.waitForSelector(mainDataLinkButton);
      await browser.close();
      await wait(2000);
      return { message: "Edu Router Connect SUCCESS" };
    } catch (e) {
      console.error(e.message);
      await browser.close();
      await wait(2000);
    
  }
};

// networkRouterEdu()
// const test = new RouterIpChanger();
// test.startRouterChanger();
