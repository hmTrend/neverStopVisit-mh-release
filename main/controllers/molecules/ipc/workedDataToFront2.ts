interface WorkedDataToFrontFunction {
  workedDataToFront: ({ mainWindow, savedData }) => Promise<void>;
}

export const workedDataToFront: WorkedDataToFrontFunction["workedDataToFront"] =
  async ({ mainWindow, savedData }) => {
    try {
      mainWindow.webContents.send("error-to-front-result", savedData);
    } catch (e) {
      mainWindow.webContents.send("error-to-front-result", savedData);
      console.error(`workedDataToFront > ${e.message}`);
      throw Error(`workedDataToFront > ${e.message}`);
    }
  };
