export const errorToFront = ({
  targetKeyword,
  mainWindow,
  errorMessage,
  workType,
  myIp,
  createdAt,
}) => {
  mainWindow.webContents.send("error-to-front-result", {
    workType,
    errorMessage,
    targetKeyword,
    myIp,
    createdAt,
  });
};
