import { autoUpdater } from "electron-updater";
import log from "electron-log";
import { ipcMain } from "electron";
import { formatBytes } from "../../services/commons/network/update";

export const autoUpdateIpc = async ({ mainWindow }) => {
  autoUpdater.on("checking-for-update", () => {
    log.info("업데이트 확인 중...");
    mainWindow.webContents.send("IPC.M-checking.for.update", "");
  });
  autoUpdater.on("update-available", () => {
    log.info("업데이트가 가능합니다.");
    mainWindow.webContents.send("IPC.M-update.available");
  });
  autoUpdater.on("update-not-available", () => {
    log.info("현재 최신버전입니다.");
    mainWindow.webContents.send("IPC.M-update.not.available");
  });
  autoUpdater.on("error", (err) => {
    log.info("에러가 발생하였습니다. 에러내용 : " + err);
    mainWindow.webContents.send("IPC.M-update.error");
  });
  autoUpdater.on("download-progress", (progressObj) => {
    let log_message =
      "다운로드 속도: " + formatBytes(progressObj.bytesPerSecond);
    log_message =
      log_message + " - 현재 " + Math.round(progressObj.percent) + "%";
    log_message =
      log_message +
      " (" +
      formatBytes(progressObj.transferred) +
      "/" +
      formatBytes(progressObj.total) +
      ")";
    log.info(log_message);
    mainWindow.webContents.send("IPC.M-download.progress", log_message);
  });
  autoUpdater.on("update-downloaded", () => {
    mainWindow.webContents.send("IPC.M-update.downloaded", "");

    ipcMain.on("IPC.M-update.confirmed", () => {
      autoUpdater.quitAndInstall(false, true);
    });
  });
  await autoUpdater.checkForUpdates();
};
