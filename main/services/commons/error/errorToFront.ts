export const errorToFront = ({
  targetKeyword,
  mainWindow,
  errorMessage,
  workType,
  myIp,
  createdAt,
}) => {
  console.log("errorToFront >>>>>> 222222222");
  mainWindow.webContents.send("error-to-front-result", {
    workType,
    errorMessage,
    targetKeyword,
    myIp,
    createdAt,
  });
};
