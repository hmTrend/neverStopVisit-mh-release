import { app, dialog } from "electron";

export class MainUtil {
  static async programUsagePeriod({ mainWindow }) {
    const myDate = new Date(2025, 8 - 1, 30);
    const currentDate = new Date();

    // Date 객체를 밀리초 단위 타임스탬프로 변환하여 연산
    const remainingDays = Math.ceil(
      (myDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (currentDate.getTime() > myDate.getTime()) {
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
