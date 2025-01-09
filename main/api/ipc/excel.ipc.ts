import { ipcMain } from "electron";
import {
  processExcelData,
  processNShoppingExcelData,
  processNShoppingExcelDataWithAlign,
  processNShoppingExcelDataWithAlignFlatMap,
} from "../../services/commons/excel/processExcelData";
import {
  processExcelDataNPlace,
  processNPlaceExcelDataWithAlignFlatMap,
} from "../../services/commons/excel/processExcelDataNPlace";
import {
  processExcelDataNShoppingLogic4,
  processNPlaceLogic4ExcelDataWithAlignFlatMap,
} from "../../services/commons/excel/processExcelDataNShoppingLogic4";

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
      const result = processNShoppingExcelData({ filePath });
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

  ipcMain.handle(
    "process-excel-file-n-shopping-data-with-align",
    (e, filePath) => {
      try {
        const result = processNShoppingExcelDataWithAlign({ filePath });
        return result;
      } catch (e) {
        console.error("Error processing excel file:", e);
        return {
          data: [],
          success: false,
          message: e.message,
        };
      }
    },
  );

  ipcMain.handle(
    "process-excel-file-n-shopping-data-with-align-flat-map",
    (e, filePath) => {
      try {
        const result = processNShoppingExcelDataWithAlignFlatMap({ filePath });
        return result;
      } catch (e) {
        console.error("Error processing excel file:", e);
        return {
          data: [],
          success: false,
          message: e.message,
        };
      }
    },
  );

  ipcMain.handle("process-excel-file-n-place", (e, filePath) => {
    try {
      const result = processExcelDataNPlace({ filePath });
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

  ipcMain.handle(
    "process-excel-file-n-place-data-with-align-flat-map",
    (e, data) => {
      try {
        const dataList = JSON.parse(data.data);
        const result = processNPlaceExcelDataWithAlignFlatMap({
          data: dataList,
        });
        return result;
      } catch (e) {
        console.error("Error processing excel file:", e);
        return {
          data: [],
          success: false,
          message: e.message,
        };
      }
    },
  );

  ipcMain.handle("process-excel-file-n-shopping-logic4", (e, filePath) => {
    try {
      const result = processExcelDataNShoppingLogic4({ filePath });
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

  ipcMain.handle(
    "process-excel-file-n-shopping-logic4-data-with-align-flat-map",
    (e, data) => {
      try {
        const dataList = JSON.parse(data.data);
        const result = processNPlaceLogic4ExcelDataWithAlignFlatMap({
          data: dataList,
        });
        return result;
      } catch (e) {
        console.error("Error processing excel file:", e);
        return {
          data: [],
          success: false,
          message: e.message,
        };
      }
    },
  );
};
