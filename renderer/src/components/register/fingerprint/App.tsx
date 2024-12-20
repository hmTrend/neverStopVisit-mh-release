import { Flex, Spinner } from "@chakra-ui/react";
import { FingerprintCreateGroup } from "@/components/register/fingerprint/FingerprintCreateGroup";
import { FingerprintGroupList } from "@/components/register/fingerprint/FingerprintGroupList";
import { FingerprintCreateExcel } from "@/components/register/fingerprint/FingerprintCreateExcel";
import { FingerprintExcelList } from "@/components/register/fingerprint/FingerprintExcelList";
import { Suspense } from "react";
import { FingerprintExcelDownload } from "@/components/register/fingerprint/FingerprintExcelDownload";
import { NetworkType } from "@/components/register/fingerprint/NetworkType";

export const App = () => {
  return (
    <Flex direction={"column"} gap={3}>
      <FingerprintCreateGroup />
      <Suspense fallback={<Spinner />}>
        <FingerprintGroupList />
      </Suspense>
      <FingerprintCreateExcel />
      <FingerprintExcelDownload />
      <NetworkType />
      <FingerprintExcelList />
    </Flex>
  );
};
