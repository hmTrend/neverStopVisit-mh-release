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
