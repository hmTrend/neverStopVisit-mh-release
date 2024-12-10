import xlsx from "xlsx";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __dirname 대체를 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function processExcelData({ filePath, sheetName = "" }) {
  try {
    // Excel 파일 읽기
    const workbook = xlsx.readFile(filePath);

    // 시트 이름이 지정되지 않은 경우 첫 번째 시트 사용
    const sheet = sheetName
      ? workbook.Sheets[sheetName]
      : workbook.Sheets[workbook.SheetNames[0]];

    // Excel 데이터를 JSON으로 변환
    const rawData = xlsx.utils.sheet_to_json(sheet, {
      header: [
        "nId",
        "nPw",
        "bPw",
        "nState",
        "createdAt",
        "ip",
        "cookie",
        "phoneNumber",
        "type",
      ],
    });

    // 헤더 행 제거
    rawData.shift();

    return rawData;
  } catch (error) {
    console.error("Excel 처리 중 오류 발생:", error);
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

export function processNShoppingExcelDataWithAlignFlatMap({
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
    const columnCount = columns.length;

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

    // 기존 결과 생성
    const intermediateResult = columns.map((col) => {
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

    // 결과를 원하는 순서로 재정렬
    const result: any[] = [];
    const totalQueries = maxQueryLength * columnCount; // 전체 쿼리 개수

    for (let i = 0; i < totalQueries; i++) {
      // 현재 위치에 해당하는 열의 인덱스 계산
      const colIndex = i % columnCount;
      // 현재 위치에 해당하는 query 인덱스 계산
      const queryIndex = Math.floor(i / columnCount);

      const item = intermediateResult[colIndex];
      result.push({
        query: item.query[queryIndex],
        title: item.title,
        catalog: item.catalog,
        nvMid: item.nvMid,
        views: item.views,
      });
    }

    return result;
  } catch (error) {
    console.error("Excel 처리 중 오류 발생:", error);
    throw error;
  }
}
