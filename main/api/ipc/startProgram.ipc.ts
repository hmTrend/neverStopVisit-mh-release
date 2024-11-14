import { ipcMain } from "electron";

export const startProgramIpc = () => {
  ipcMain.handle("start-program", (event, args) => {
    const data = JSON.parse(args);
    console.log("oksk");
    console.log(data);
  });
};
