export const errorToFront = ({
  targetKeyword,
  mainWindow,
  errorMessage,
  workType,
}) => {
  mainWindow.webContents.send("error-to-front-result", {
    workType,
    errorMessage,
    targetKeyword,
  });
};
