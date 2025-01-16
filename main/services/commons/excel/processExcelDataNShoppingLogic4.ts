import xlsx from "xlsx";

export function processExcelDataNShoppingLogic4({ filePath, sheetName = "" }) {
  try {
    // 엑셀 파일 읽기
    const workbook = xlsx.readFile(filePath);
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

    // 시트를 JSON으로 변환
    const data = xlsx.utils.sheet_to_json(firstSheet, { header: 1 }) as any[][];

    // 데이터 유효성 검사
    if (!data || data.length === 0) {
      throw new Error("엑셀 데이터가 비어있습니다.");
    }

    // 컬럼 헤더 가져오기 (B열 값들)
    const headers = {};
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i][1] && data[i][1] !== "") {
        headers[data[i][1]] = i;
      }
    }

    // 필수 헤더 확인
    const requiredHeaders = [
      "targetKeyword",
      "delayTime",
      "nvMidList",
      "nvMid",
      "nowCount",
      "dayCount",
      "workKeywordList",
    ];
    for (const header of requiredHeaders) {
      if (!(header in headers)) {
        throw new Error(`필수 헤더가 없습니다: ${header}`);
      }
    }

    // 결과 배열 초기화
    const result = [];

    // C열부터 각 컬럼 처리
    for (let colIndex = 2; colIndex < (data[0]?.length || 0); colIndex++) {
      try {
        const columnData = {
          targetKeyword: data[headers["targetKeyword"]]?.[colIndex] || "",
          delayTime: Number(data[headers["delayTime"]]?.[colIndex]) || 0,
          nvMidList: data[headers["nvMidList"]]?.[colIndex] || "",
          nvMid: data[headers["nvMid"]]?.[colIndex] || "",
          nowCount: Number(data[headers["nowCount"]]?.[colIndex]) || 0,
          dayCount: Number(data[headers["dayCount"]]?.[colIndex]) || 0,
          workKeywordList: [],
        };

        // workKeywordList 처리
        const startRow = headers["workKeywordList"];
        if (startRow !== undefined) {
          for (let row = startRow; row < data.length; row++) {
            const cellValue = data[row]?.[colIndex];
            if (cellValue) {
              // URL 패턴으로 문자열 분리
              const matches = cellValue.match(/([^=]+)=(https?:\/\/[^\s]+)/g);
              if (matches) {
                matches.forEach((match) => {
                  const [workKeyword, targetBlog] = match.split("=");
                  if (workKeyword && targetBlog) {
                    columnData.workKeywordList.push({
                      workKeyword: workKeyword.trim(),
                      targetBlog: targetBlog.trim(),
                    });
                  }
                });
              }
            }
          }
        }

        // 유효한 데이터만 결과에 추가
        if (columnData.targetKeyword || columnData.workKeywordList.length > 0) {
          result.push(columnData);
        }
      } catch (columnError) {
        console.error(`Error processing column ${colIndex}:`, columnError);
        // 개별 컬럼 처리 오류를 무시하고 계속 진행
        continue;
      }
    }

    if (result.length === 0) {
      throw new Error("처리된 데이터가 없습니다.");
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
  targetKeyword?: string | null;
  delayTime?: string | null;
  nvMidList?: string | null;
  nvMid?: string | null;
  nowCount: string[];
  dayCount: string[];
  workKeyword: string[];
  workKeywordList: string[];
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
      const obj = {
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
      const obj = {
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

export function processNPlaceLogic4ExcelDataWithAlignFlatMap({
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
      item.workKeywordList.forEach((subKeyword) => {
        result.push({
          targetKeyword: item.targetKeyword,
          delayTime: item.delayTime,
          nvMidList: item.nvMidList,
          nvMid: item.nvMid,
          nowCount: item.nowCount,
          dayCount: item.dayCount,
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
