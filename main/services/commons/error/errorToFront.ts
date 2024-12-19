export const errorToFront = ({ mainWindow, errorMessage, workType }) => {
  mainWindow.webContents.send("error-to-front-result", {
    workType,
    errorMessage,
  });
};
