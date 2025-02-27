interface IIpcBackLogging {
  ipcBackLogging: ({ mainWindow, data }) => Promise<void>;
}

export const ipcBackLogging: IIpcBackLogging["ipcBackLogging"] = async ({
  mainWindow,
  data,
}) => {
  try {
    mainWindow.webContents.send("ipc-back-logging", data);
  } catch (e) {
    mainWindow.webContents.send("ipc-back-logging", data);
    console.error(`ipcBackLogging > ${e.message}`);
    throw Error(`ipcBackLogging > ${e.message}`);
  }
};
