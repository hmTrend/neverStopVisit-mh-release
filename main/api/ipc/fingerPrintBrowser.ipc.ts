import { ipcMain } from "electron";
import { PuppeteerEngine } from "../../services/commons/PuppeteerEngine";
import { cookieNstateSave } from "../../services/commons/PuppeteerEngine/cookieNstateSave";

export const fingerPrintBrowserIpc = async () => {
  let engine;
  ipcMain.handle("finger-print-browser-open", async (event, args) => {
    let parsedCookie = []; // 기본값 설정

    try {
      const { cookie } = args;
      // cookie가 존재하고 빈 문자열이 아닐 때만 파싱 시도
      if (cookie && cookie.trim()) {
        parsedCookie = JSON.parse(cookie);
      }

      engine = new PuppeteerEngine();
      await engine.initialize({
        url: "https://m.naver.com/",
        cookie: parsedCookie,
      });
    } catch (error) {
      console.error("Cookie parsing error:", error);
      // 에러가 나도 기본값으로 계속 진행
      engine = new PuppeteerEngine();
      await engine.initialize({
        url: "https://m.naver.com/",
        cookie: [],
      });
    }
  });
  ipcMain.handle("finger-print-browser-close", async (event, args) => {
    const { _id } = args;
    console.log("_id 333");
    console.log(_id);
    await cookieNstateSave({
      page: engine.page,
      _id,
      nState: "쿠키",
    });
    await engine.browser.close();
  });
};
