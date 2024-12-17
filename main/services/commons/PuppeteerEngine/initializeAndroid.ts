import { remote } from "webdriverio";
import type { Cookie } from "@wdio/protocols";

const capabilities = {
  platformName: "Android",
  "appium:automationName": "UiAutomator2",
  "appium:deviceName": "Android Device",
  "appium:appPackage": "com.coupang.mobile",
  "appium:appActivity":
    "com.coupang.mobile.domain.home.presentation.view.MainActivity", // 수정된 부분
  "appium:noReset": true,
  "appium:autoLaunch": true,
  "appium:forceAppLaunch": true,
};

async function launchCoupangWithCookie() {
  try {
    console.log("Initializing WebDriver session...");
    const driver = await remote({
      protocol: "http",
      hostname: "localhost",
      port: 4723,
      path: "/",
      capabilities: capabilities,
      connectionRetryCount: 1,
    });

    const cookies: Cookie[] = [
      {
        name: "CT_AT",
        value:
          "eyJraWQiOiJjMjM3NDM1OC1lYzZlLTRkNjgtOTFlNS0zMjVkM2I4YjVkMmMiLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHQiOnsiTFNJRCI6IjM3N2EzYzU4LTU0ZjMtNDIzYS1iYTkwLTcyNmQwOTEzYjJjNiIsIk5PTkNFIjoiYzgzMGI1NmIyNjY1MjgzNDhmMjdlNjIwY2VjN2ZiNjUiLCJmaWF0IjoxLjcyMDQwMDc4NkU5LCJGQUdFIjoiMTYifSwic3ViIjoiMTU4NTUwNzU3IiwiYXVkIjpbImh0dHBzOi8vd3d3LmNvdXBhbmcuY29tIiwiLSJdLCJzY3AiOlsib3BlbmlkIiwib2ZmbGluZSIsImNvcmUiLCJjb3JlLXNoYXJlZCIsInBheSJdLCJuYmYiOjE3MzM4MTc0MDQsImlzcyI6Imh0dHBzOi8vbWF1dGguY291cGFuZy5jb20vIiwiZXhwIjoxNzMzODMxODA0LCJpYXQiOjE3MzM4MTc0MDQsImp0aSI6IjRlMDhjNGNjLWQxNmUtNGYzMS1iMjEwLTQ5NzlmM2ViNTM3ZiIsImNsaWVudF9pZCI6IjRlMmUwMmM4LTc0NTYtNGJkNC05Yzc1LTViOThmMjA1ODM4MiJ9.OjOtcVBHXkQqQ-QQa2q-KxuoGVt2JU-db-rR5uyLzzGLyDQ5-s8nG-umtahKWJt5MD8JheU1Tvn48zLZ1SdJtg",
        domain: ".coupang.com",
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        expiry: -1,
      },
    ];
    console.log("Getting available contexts...");
    const contexts = await driver.getContexts();
    console.log("Available contexts:", contexts);

    const webviewContextStr = contexts.find(
      (context) => String(context).indexOf("WEBVIEW") !== -1,
    );

    if (webviewContextStr) {
      console.log("Switching to WebView context...");
      await driver.switchContext(String(webviewContextStr));

      // 특정 URL로 이동
      // const productUrl =
      //   "https://m.coupang.com/vm/products/7650471045?vendorItemId=915909722944";
      // console.log("Navigating to product page...");
      // await driver.url(productUrl);
      console.log("Setting authentication cookies...");
      // await driver.setCookies(cookies);

      console.log("Switching to WebView context...");
      await driver.switchContext(String(webviewContextStr));

      // 특정 URL로 이동
      // const productUrl =
      //   "https://m.coupang.com/vm/products/7650471045?vendorItemId=915909722944";
      // console.log("Navigating to product page...");
      // await driver.url(productUrl);
      // 쿠키 설정
      console.log("cookie list comming...");
      const cookies = await driver.getAllCookies();
      console.log("now cookie infomation:", JSON.stringify(cookies, null, 2));

      //
      console.log("Switching back to native context...");
      await driver.switchContext("NATIVE_APP");
      await dumpSharedPreferences(driver);
    }
    console.log("Coupang app launched successfully");

    // 결과 확인을 위한 대기
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await driver.waitUntil(
      async () => {
        const currentActivity = await driver.getCurrentActivity();
        return currentActivity !== "com.coupang.mobile.SplashActivity";
      },
      {
        timeout: 10000,
        timeoutMsg: "App loading timeout exceeded",
      },
    );

    console.log("Coupang app launched successfully with authentication");

    // Optional: Add waiting time to keep the session alive
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

async function dumpSharedPreferences(driver) {
  try {
    // SharedPreferences 덤프
    const preferenceDump = await driver.execute("mobile: shell", {
      command: "cat /data/data/com.coupang.mobile/shared_prefs/*",
    });
    console.log("SharedPreferences Contents:", preferenceDump);
  } catch (error) {
    console.error("Error dumping SharedPreferences:", error);
  }
}

launchCoupangWithCookie();
