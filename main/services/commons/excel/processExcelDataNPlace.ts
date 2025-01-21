import xlsx from "xlsx";

export function processExcelDataNPlace({ filePath, sheetName = "" }) {
  try {
    // Read the Excel file
    const workbook = xlsx.readFile(filePath);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][];

    // Get column headers (B column values)
    const headers = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i][1] && data[i][1] !== "") {
        headers[data[i][1]] = i;
      }
    }

    // Initialize result array
    const result = [];

    // Process each column starting from C
    for (let colIndex = 2; colIndex < data[0].length; colIndex++) {
      const columnData = {
        keyword: data[headers["keyword"]][colIndex],
        delayTime: data[headers["delayTime"]][colIndex],
        placeName: data[headers["placeName"]][colIndex],
        placeNumber: data[headers["placeNumber"]][colIndex],
        dayCount: data[headers["dayCount"]][colIndex],
        subKeywordList: [],
      };

      // Process subKeywordList
      const startRow = headers["subKeywordList"];
      for (let row = startRow; row < data.length; row++) {
        if (data[row][colIndex]) {
          const parts = data[row][colIndex].split("==");
          if (parts.length >= 2) {
            columnData.subKeywordList.push({
              targetKeyword: parts[0],
              targetBlog: parts[1],
            });
          }
        }
      }

      result.push(columnData);
    }

    return result;
  } catch (error) {
    console.error("Error processing Excel file:", error);
    throw error;
  }
}

interface RawExcelRow {
  [key: string]: string | undefined;
  A?: string;
}

interface ProcessedData {
  title?: string | null;
  catalog?: string | null;
  nvMid?: string | null;
  views?: string | null;
  query: string[];
  [key: string]: string | string[] | null | undefined;
}

interface QueryArrays {
  [key: string]: string[];
}

export function processNShoppingExcelData({
  filePath,
  sheetName = "",
}: {
  filePath: string;
  sheetName?: string;
}) {
  try {
    const workbook = xlsx.readFile(filePath);

    const sheet = sheetName
      ? workbook.Sheets[sheetName]
      : workbook.Sheets[workbook.SheetNames[0]];

    // Excel 데이터를 JSON으로 변환 (A열을 헤더로 사용)
    const rawData = xlsx.utils.sheet_to_json<RawExcelRow>(sheet, {
      header: "A",
    });

    // 1번째 행(타이틀) 제거
    rawData.shift();

    // 모든 열 키 찾기 (A 제외)
    const columns = Object.keys(rawData[0] || {}).filter((key) => key !== "A");

    // 임시로 각 열의 query 배열을 저장할 객체
    const queryArrays: QueryArrays = {};

    // 각 열의 query 배열 수집
    columns.forEach((col) => {
      queryArrays[col] = [];
      const queryIndex = rawData.findIndex((r) => r.A === "query");

      // query 행부터 시작하여 값 수집
      if (queryIndex !== -1 && rawData[queryIndex][col]) {
        queryArrays[col].push(rawData[queryIndex][col] as string);
      }

      // query 다음 행들의 값 수집
      for (let i = queryIndex + 1; i < rawData.length; i++) {
        if (rawData[i][col]) {
          queryArrays[col].push(rawData[i][col] as string);
        }
      }
    });

    // 최종 결과 생성
    const result = columns.map((col) => {
      const obj: ProcessedData = {
        query: [],
      };

      // 기본 필드 처리
      rawData.forEach((row) => {
        const key = row.A;
        if (key && key !== "query") {
          obj[key] = row[col] || null;
        }
      });

      // query 배열 추가
      obj.query = queryArrays[col];

      return obj;
    });

    return result;
  } catch (error) {
    console.error("Excel 처리 중 오류 발생:", error);
    throw error;
  }
}

export function processNShoppingExcelDataWithAlign({
  filePath,
  sheetName = "",
}: {
  filePath: string;
  sheetName?: string;
}) {
  try {
    const workbook = xlsx.readFile(filePath);

    const sheet = sheetName
      ? workbook.Sheets[sheetName]
      : workbook.Sheets[workbook.SheetNames[0]];

    // Excel 데이터를 JSON으로 변환 (A열을 헤더로 사용)
    const rawData = xlsx.utils.sheet_to_json<RawExcelRow>(sheet, {
      header: "A",
    });

    // 1번째 행(타이틀) 제거
    rawData.shift();

    // 모든 열 키 찾기 (A 제외)
    const columns = Object.keys(rawData[0] || {}).filter((key) => key !== "A");

    // 임시로 각 열의 query 배열을 저장할 객체
    const queryArrays: QueryArrays = {};

    // 각 열의 query 배열 수집
    columns.forEach((col) => {
      queryArrays[col] = [];
      const queryIndex = rawData.findIndex((r) => r.A === "query");

      // query 행부터 시작하여 값 수집
      if (queryIndex !== -1 && rawData[queryIndex][col]) {
        queryArrays[col].push(rawData[queryIndex][col] as string);
      }

      // query 다음 행들의 값 수집
      for (let i = queryIndex + 1; i < rawData.length; i++) {
        if (rawData[i][col]) {
          queryArrays[col].push(rawData[i][col] as string);
        }
      }
    });

    // [QUERY 줄맞추기] 가장 긴 query 배열의 길이 찾기
    const maxQueryLength = Math.max(
      ...Object.values(queryArrays).map((arr) => arr.length),
    );

    // [QUERY 줄맞추기] query 배열 길이 맞추기
    Object.keys(queryArrays).forEach((col) => {
      const originalArray = queryArrays[col];
      if (originalArray.length < maxQueryLength) {
        const newArray: string[] = [];
        for (let i = 0; i < maxQueryLength; i++) {
          newArray[i] = originalArray[i % originalArray.length];
        }
        queryArrays[col] = newArray;
      }
    });

    // 최종 결과 생성
    const result = columns.map((col) => {
      const obj: ProcessedData = {
        query: [],
      };

      // 기본 필드 처리
      rawData.forEach((row) => {
        const key = row.A;
        if (key && key !== "query") {
          obj[key] = row[col] || null;
        }
      });

      // query 배열 추가
      obj.query = queryArrays[col];

      return obj;
    });

    return result;
  } catch (error) {
    console.error("Excel 처리 중 오류 발생:", error);
    throw error;
  }
}

export function processNPlaceExcelDataWithAlignFlatMap({
  data,
  sheetName = "",
}: {
  data: any;
  sheetName?: string;
}) {
  try {
    const result = [];

    data.forEach((item) => {
      // subKeywordList의 각 항목에 대해 새로운 객체 생성
      item.subKeywordList.forEach((subKeyword) => {
        result.push({
          keyword: item.keyword,
          delayTime: item.delayTime,
          placeName: item.placeName,
          placeNumber: item.placeNumber,
          totalDayCount: item.dayCount,
          ...subKeyword, // 단일 항목 배열로 변환
        });
      });
    });

    return result;
  } catch (error) {
    console.error("Excel 처리 중 오류 발생:", error);
    throw error;
  }
}
