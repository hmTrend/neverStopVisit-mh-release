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
          "eyJraWQiOiJjMjM3NDM1OC1lYzZlLTRkNjgtOTFlNS0zMjVkM2I4YjVkMmMiLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHQiOnsiTFNJRCI6IjdiM2JhNWM5LWZjMjQtNDE2ZS1hODE1LTU4MjFhNDU2OTkyZSIsIk5PTkNFIjoiMTVkYTIyM2RiN2RjMGI2NDU2NTg4MzMwNTQ5NTc3NWMiLCJmaWF0IjoxLjcyMDQwNTgzOUU5LCJGQUdFIjoiNiJ9LCJzdWIiOiIxNTg1NTEzNjUiLCJhdWQiOlsiaHR0cHM6Ly93d3cuY291cGFuZy5jb20iLCItIl0sInNjcCI6WyJvcGVuaWQiLCJvZmZsaW5lIiwiY29yZSIsImNvcmUtc2hhcmVkIiwicGF5Il0sIm5iZiI6MTczMDY4NjM5OSwiaXNzIjoiaHR0cHM6Ly9tYXV0aC5jb3VwYW5nLmNvbS8iLCJleHAiOjE3MzA3MDA3OTksImlhdCI6MTczMDY4NjM5OSwianRpIjoiZjM1ZTAwNTctYzg4Ni00NWFjLThmOTUtNzRlZWYzNGRkOGRkIiwiY2xpZW50X2lkIjoiNGUyZTAyYzgtNzQ1Ni00YmQ0LTljNzUtNWI5OGYyMDU4MzgyIn0.Erle9uM1OjGq8NxkTjL7hSbM9VkyBIXJj_BIaLnYcBjNyJQAQtTONkUumFSStebsieuLyBxWCwTfixFxO8SPBw",
        domain: ".coupang.com",
        path: "/",
        httpOnly: true,
        secure: true,
      },
    ];
    // 앱이 완전히 로드될 때까지 기다림
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Getting available contexts...");
    const contexts = await driver.getContexts();
    console.log("Available contexts:", contexts);

    const webviewContextStr = contexts.find(
      (context) => String(context).indexOf("WEBVIEW") !== -1,
    );

    if (webviewContextStr) {
      console.log("Switching to WebView context...");
      await driver.switchContext(String(webviewContextStr));

      console.log("Setting authentication cookies...");
      await driver.setCookies(cookies);
      // 특정 URL로 이동
      const productUrl =
        "https://m.coupang.com/vm/products/7650471045?vendorItemId=915909722944";
      console.log("Navigating to product page...");
      await driver.url(productUrl);

      console.log("Switching back to native context...");
      await driver.switchContext("NATIVE_APP");
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

launchCoupangWithCookie();
