import path from "path";
import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { excelIpc } from "./api/ipc/excel.ipc";
import { startProgramIpc } from "./api/ipc/startProgram.ipc";
import { fingerPrintBrowserIpc } from "./api/ipc/fingerPrintBrowser.ipc";
import { autoUpdateIpc } from "./api/ipc/autoUpdate.ipc";
import { MainUtil } from "./services/commons/main/main.util";

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();
  let isUpdateChecked = false;
  const mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
  }

  if (isProd) {
    await mainWindow.loadURL("app://.");
    await MainUtil.programUsagePeriod({ mainWindow });
    if (!isUpdateChecked) {
      await autoUpdateIpc({ mainWindow });
      isUpdateChecked = true;
    }
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("message", async (event, arg) => {
  event.reply("message", `${arg} World!`);
});

excelIpc();
startProgramIpc();
fingerPrintBrowserIpc();

ipcMain.on("main:quit", () => {
  app.quit();
});
