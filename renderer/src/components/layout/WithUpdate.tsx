import { useEffect, useState } from "react";
import { Alert, AlertIcon, Box, Button, Flex, Stack } from "@chakra-ui/react";
export const WithUpdate = ({ children }) => {
  const [isCheckingForUpdate, setIsCheckingForUpdate] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdateNotAvailable, setIsUpdateNotAvailable] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const [onDownloadProgress, setOnDownloadProgress] = useState("");
  const [isUpdateDownloaded, setIsUpdateDownloaded] = useState(false);

  useEffect(() => {
    // 업데이트 확인중 ...
    window.ipc.on("IPC.M-checking.for.update", () => {
      setIsCheckingForUpdate(true);
    });

    // 현재 최신버전입니다.
    window.ipc.on("IPC.M-update.not.available", () => {
      setIsCheckingForUpdate(false); // 업데이트 확인중 ...
      setIsUpdateNotAvailable(true);
      setTimeout(() => {
        setIsUpdateNotAvailable(false);
      }, 3000);
    });

    window.ipc.on("IPC.M-update.available", () => {
      setIsCheckingForUpdate(false);
      setIsUpdateAvailable(true);
    });

    window.ipc.on("IPC.M-download.progress", (args: string) => {
      setIsUpdateAvailable(false);
      setOnDownloadProgress(args);
    });

    // 다운로드 완료시
    window.ipc.on("IPC.M-update.downloaded", () => {
      setOnDownloadProgress("");
      setIsUpdateAvailable(false);
      setIsUpdateDownloaded(true);
    });

    window.ipc.on("IPC.M-update.error", () => {
      setIsCheckingForUpdate(false); // 업데이트 확인중 ...
      setIsUpdateNotAvailable(false);
      setIsUpdateAvailable(false);
      setOnDownloadProgress("");
      setIsUpdateError(true);
    });
  }, []);

  const handleUpdatedConfirmClick = () => {
    window.ipc.send("IPC.M-update.confirmed", "");
  };

  return (
    <Flex direction={"column"}>
      <Box as="section">
        <Box borderBottomWidth="1px" bg="bg.surface">
          <Stack spacing={3}>
            {isCheckingForUpdate && (
              <Alert status="warning">
                <AlertIcon />
                업데이트 확인중 ...
              </Alert>
            )}
            {isUpdateAvailable && (
              <Alert status="info">
                <AlertIcon />
                업데이트가 가능합니다.
              </Alert>
            )}
            {isUpdateNotAvailable && (
              <Alert status="success">
                <AlertIcon />
                현재 최신버전입니다.
              </Alert>
            )}
            {isUpdateError && (
              <Alert status="error">
                <AlertIcon />
                업데이트 에러가 발생했습니다.
              </Alert>
            )}
            {onDownloadProgress && (
              <Alert status="loading">
                <AlertIcon />
                {onDownloadProgress}
              </Alert>
            )}
            {isUpdateDownloaded && (
              <Alert status="success" variant="solid" gap={6}>
                <AlertIcon />
                <Box
                  display={["none", "none", "block", "block"]}
                  width={["100%", "100%", "240px", "100%"]}
                >
                  다운로드가 완료되었습니다.
                </Box>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  background={"white"}
                  minW={"128px"}
                  onClick={handleUpdatedConfirmClick}
                >
                  설치 및 재시작
                </Button>
              </Alert>
            )}
          </Stack>
        </Box>
      </Box>
      {children}
    </Flex>
  );
};
