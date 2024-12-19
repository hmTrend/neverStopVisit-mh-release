export const errorToFront = ({ mainWindow, errorMessage, workType }) => {
  mainWindow.webContents.send("error-to-front-result", {
    data: { workType, errorMessage },
  });
};
