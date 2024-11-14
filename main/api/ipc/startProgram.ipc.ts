import { ipcMain } from "electron";
import { NShopping } from "../../services/nShopping";

export const startProgramIpc = () => {
  ipcMain.handle("start-program", (event, args) => {
    const data = JSON.parse(args);
    console.log("oksk");
    console.log(data);
    const instanceOne = new NShopping();
    Promise.all([instanceOne.start()])
      .then(() => console.log("Both instances completed"))
      .catch((error) => console.error("An error occurred:", error));
  });
};
