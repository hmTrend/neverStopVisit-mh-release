import { ipcMain } from "electron";
import { NShopping } from "../../services/nShopping";

export const startProgramIpc = () => {
  ipcMain.handle("start-program", async (event, args) => {
    const data = JSON.parse(args);
    console.log("oksk");
    const { nShopping } = data;

    let startProgramList = [];
    const instanceOne = new NShopping();

    if (nShopping.isStart) {
      startProgramList.push(instanceOne.start({ nShopping }));
    }

    const result = await Promise.all([...startProgramList]);

    console.log(result);
    return { data: result };
  });
};
