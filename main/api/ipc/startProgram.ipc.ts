import { ipcMain } from "electron";
import { NShopping } from "../../services/nShopping";
import { CreateNShoppingExcelListAlignFlatMap } from "../../lib/apollo/n-shopping-apollo";

export const startProgramIpc = () => {
  ipcMain.handle("start-program", async (event, args) => {
    const data = JSON.parse(args);
    console.log("oksk");
    const { nShopping } = data;

    {
      const { data } = await CreateNShoppingExcelListAlignFlatMap({
        groupFid: nShopping.selectedGroup.groupId,
      });
      console.log("data 2222");
      console.log(data);
    }

    let startProgramList = [];
    const instanceOne = new NShopping();

    if (nShopping.isStart) {
      startProgramList.push(instanceOne.start());
    }

    const result = await Promise.all([...startProgramList]);

    console.log(result);
    return { data: result };
  });
};
