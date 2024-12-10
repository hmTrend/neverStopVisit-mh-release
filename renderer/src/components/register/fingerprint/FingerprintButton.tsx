import React, { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";

// 열린 브라우저를 추적하기 위한 Map
const openBrowsers = new Map();

export const FingerprintButton = ({ _id }) => {
  const [isOpen, setIsOpen] = useState(openBrowsers.has(_id));
  const toast = useToast();

  useEffect(() => {
    // 브라우저 닫힘 이벤트 리스너
    const handleBrowserClosed = (data) => {
      if (data._id === _id) {
        openBrowsers.delete(_id);
        setIsOpen(false);
      }
    };
    // 이벤트 리스너 등록
    window.ipc.on("browser-closed", handleBrowserClosed);
  }, [_id]);

  const handleOpenBrowser = async () => {
    try {
      const result = await window.ipc.invoke("finger-print-browser-open", {
        _id,
      });
      openBrowsers.set(_id, true);
      setIsOpen(true);
    } catch (error) {
      console.error("Failed to open browser:", error);
      toast({
        title: "지문열기 실패",
        description: `${error.message.includes("initialize") ? "쿠키 검증 실패" : error.message.includes("valid JSON") ? "쿠키값 형식 오류" : "기타 오픈실패"}`,
        isClosable: true,
        duration: 3000,
        status: "error",
      });
    }
  };

  const handleCloseBrowser = async () => {
    try {
      const result = await window.ipc.invoke("finger-print-browser-close", {
        _id,
      });
      openBrowsers.delete(_id);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to close browser:", error);
      toast({
        title: "지문닫기 실패",
        description: `${error.message.includes("initialize") ? "쿠키 검증 실패" : error.message.includes("valid JSON") ? "쿠키값 형식 오류" : "기타 닫기실패"}`,
        isClosable: true,
        duration: 3000,
        status: "error",
      });
    }
  };

  return (
    <>
      {isOpen ? (
        <Button
          onClick={handleCloseBrowser}
          bg={"green.200"}
          p={3}
          fontSize={"xs"}
          variant="solid"
        >
          창닫기
        </Button>
      ) : (
        <Button onClick={handleOpenBrowser} fontSize={"xs"} variant="link">
          OPEN
        </Button>
      )}
    </>
  );
};

export default FingerprintButton;
