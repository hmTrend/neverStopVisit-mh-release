import { Button, Flex } from "@chakra-ui/react";
import { useSnapshot } from "valtio/react";
import { storeFingerPrintRegister } from "@/valtio/fingerPrint.register.valtio";
import * as XLSX from "xlsx";
import { useGetExcelListDownload } from "@/hook/fingerPrint/useGetExcelListDownload";

export const FingerprintExcelDownload = () => {
  const { selectedGroupName, selectedGroupId } = useSnapshot(
    storeFingerPrintRegister,
  );
  const { getExcelList } = useGetExcelListDownload();

  const GetExcelList = async ({ dataListCount }) => {
    const { data, listTotalCount } = await getExcelList({
      groupFid: selectedGroupId,
      dataListCount,
    });
    return { data, listTotalCount };
  };

  async function ExcelExportButton({ type }) {
    console.log("type 33333");
    console.log(type);
    if (type === "정상지문") {
      console.log("this is oksk");
    }
    const { data } = await GetExcelList({ dataListCount: 100000 });
    // Transform data for Excel format
    const transformedData = data
      .filter((item) => {
        if (type === "정상지문") {
          return item.nState === "정상" || item.nState === "쿠키";
        }
        return item;
      })
      .map((item) => ({
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

  return (
    <Flex gap={9}>
      {/*<Button*/}
      {/*  variant={"link"}*/}
      {/*  onClick={() =>*/}
      {/*    ExcelExportButton({*/}
      {/*      type: "그룹지문",*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  그룹지문 엑셀다운받기*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  variant={"link"}*/}
      {/*  onClick={() =>*/}
      {/*    ExcelExportButton({*/}
      {/*      type: "정상지문",*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  정상지문 엑셀다운받기*/}
      {/*</Button>*/}
    </Flex>
  );
};
