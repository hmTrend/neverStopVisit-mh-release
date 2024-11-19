import { ipcMain } from "electron";
import { PuppeteerEngine } from "../../services/commons/PuppeteerEngine";

export const fingerPrintBrowserIpc = async () => {
  ipcMain.handle("finger-print-browser-open", async (event, args) => {
    const { cookie } = args;
    const engine = new PuppeteerEngine();
    await engine.initialize({
      url: "https://www.naver.com/",
      cookie: JSON.parse(cookie),
    });
  });
};
