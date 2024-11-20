import { app, dialog } from "electron";

export class MainUtil {
  static async programUsagePeriod({ mainWindow }) {
    const myDate = new Date(2024, 13 - 1, 90);
    const currentDate = new Date();
    const remainingDays = Math.ceil(
      (myDate - currentDate) / (1000 * 60 * 60 * 24),
    );
    if (new Date() > myDate) {
      await dialog.showMessageBox({
        type: "info",
        title: "Information",
        message: "프로그램 사용기간 만료",
      });
      app.quit();
    }
    console.log("remainingDays");
    console.log(remainingDays);
    mainWindow.webContents.send("program-usage-period-result", remainingDays);
  }
}
