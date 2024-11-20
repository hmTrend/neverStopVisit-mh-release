import { Button, Flex } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import * as XLSX from "xlsx";

export const FingerprintExcelDownload = () => {
  const { selectedExcelList, selectedGroupName } = useSnapshot(
    storeFingerPrintRegister,
  );
  return (
    <Flex gap={9}>
      <Button
        variant={"link"}
        onClick={() =>
          ExcelExportButton({
            data: selectedExcelList,
            selectedGroupName,
            type: "그룹지문",
          })
        }
      >
        그룹지문 엑셀다운받기
      </Button>
      <Button
        variant={"link"}
        onClick={() =>
          ExcelExportButton({
            data: selectedExcelList.filter((v) => v.nState === "정상"),
            selectedGroupName,
            type: "정상지문",
          })
        }
      >
        정상지문 엑셀다운받기
      </Button>
    </Flex>
  );
};

function ExcelExportButton({ data, selectedGroupName, type }) {
  // Transform data for Excel format
  const transformedData = data.map((item) => ({
    nId: item.nId,
    nPw: item.nPw,
    bPw: item.bPw,
    nState: item.nState,
    createdAt: new Date(item.createdAt).toLocaleDateString(),
    ip: item.ip,
    cookie: item.cookie,
    phoneNumber: item.phoneNumber || "",
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(transformedData);

  // Set column widths
  const columnWidths = [
    { wch: 15 }, // nId
    { wch: 15 }, // nPw
    { wch: 15 }, // bPw
    { wch: 15 }, // nState
    { wch: 20 }, // createdAt
    { wch: 15 }, // ip
    { wch: 50 }, // cookie
    { wch: 15 }, // phoneNumber
  ];
  ws["!cols"] = columnWidths;

  const today = new Date();
  const sheetName = today.toISOString().split("T")[0];
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // Save file
  const fileName = `${selectedGroupName}_${type}_${sheetName}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
