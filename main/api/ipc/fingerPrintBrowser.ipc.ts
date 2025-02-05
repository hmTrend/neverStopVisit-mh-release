import { ipcMain } from "electron";
import { PuppeteerEngine } from "../../services/commons/PuppeteerEngine";
import { cookieNstateSave } from "../../services/commons/PuppeteerEngine/cookieNstateSave";
import { GetFingerPrintTargetExcelOneFromId } from "../../lib/apollo/finger-print.apollo";

export const fingerPrintBrowserIpc = async () => {
  // Map을 사용하여 각 _id별로 engine 인스턴스 관리
  const engineMap = new Map();

  ipcMain.handle("finger-print-browser-open", async (event, args) => {
    let parsedCookie = [];

    try {
      const { _id, type, fingerPrintNetworkType } = args;
      const { data } = await GetFingerPrintTargetExcelOneFromId({ _id });

      try {
        if (data && data.cookie.trim()) {
          parsedCookie = JSON.parse(data.cookie);
        }
      } catch (e) {
        console.error(e.message);
      }

      // 새로운 engine 인스턴스 생성
      const newEngine = new PuppeteerEngine();
      if (type === "naverM") {
        await newEngine.initialize({
          url: "https://m.naver.com/",
          cookie: parsedCookie ?? "",
          type,
        });
      } else {
        await newEngine.initializeForPC({
          url:
            type === "coupang" ? "https://coupang.com/" : "https://naver.com",
          cookie: parsedCookie ?? "",
          type,
          fingerPrintNetworkType,
        });
      }

      newEngine.page.on("dialog", async (dialog) => {
        // 대화상자 종류 확인
        console.log("Dialog type:", dialog.type());
        console.log("Dialog message:", dialog.message());

        // 확인/취소 창인 경우
        if (dialog.type() === "confirm") {
          // 자동으로 처리하지 않고 대기
          // 수동으로 처리하려면 dialog.accept() 또는 dialog.dismiss() 호출 필요
          return; // 아무 처리도 하지 않음
        }
      });

      // Map에 저장
      engineMap.set(_id, newEngine);

      // 페이지 close 이벤트 감지
      newEngine.page.on("close", async () => {
        event.sender.send("browser-closed", { _id });
        console.log("Page closed event triggered");
        const engine = engineMap.get(_id);

        if (engine) {
          if (type !== "coupang") {
            await cookieNstateSave({
              page: engine.page,
              _id,
              nState: "정상",
            });
            engineMap.delete(_id);
            await engine.browser.close();
          }
        }
      });
    } catch (error) {
      console.error("Cookie parsing error:", error);
      const { _id } = args;
      const newEngine = new PuppeteerEngine();
      await newEngine.initialize({
        url: "https://m.naver.com/",
        cookie: [],
      });
      engineMap.set(_id, newEngine);
    }
  });

  ipcMain.handle("finger-print-browser-close", async (event, args) => {
    const { _id, type } = args;
    const engine = engineMap.get(_id);

    if (engine) {
      if (type !== "coupang") {
        await cookieNstateSave({
          page: engine.page,
          _id,
          nState: "정상",
        });
        engineMap.delete(_id);
        await engine.browser.close();
      }
    }
  });
};
