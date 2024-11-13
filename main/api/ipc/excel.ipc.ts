import { ipcMain } from "electron";
import { processExcelData } from "../../services/commons/excel/processExcelData";

export const excelIpc = () => {
  ipcMain.handle("process-excel-file", (e, filePath) => {
    try {
      console.log("Received excel file path:", filePath);
      const result = processExcelData({ filePath });
      return {
        data: result,
        success: true,
        message: `Excel file processed: ${filePath}`,
      };
    } catch (e) {
      console.error("Error processing excel file:", e);
      return {
        data: [],
        success: false,
        message: e.message,
      };
    }
  });

  ipcMain.handle("process-excel-file-n-shopping", (e, filePath) => {
    try {
      console.log("Received excel file path:", filePath);
      const result = processExcelData({ filePath });
      return {
        data: result,
        success: true,
        message: `Excel file processed: ${filePath}`,
      };
    } catch (e) {
      console.error("Error processing excel file:", e);
      return {
        data: [],
        success: false,
        message: e.message,
      };
    }
  });
};
