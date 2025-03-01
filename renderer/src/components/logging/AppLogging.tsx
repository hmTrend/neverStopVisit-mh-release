import {
  Flex,
  Text,
  Box,
  VStack,
  Badge,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface LoggingData {
  functionName: string;
  args: any;
  timestamp?: string;
  level?: string;
}

export function AppLogging() {
  const [logs, setLogs] = useState<LoggingData[]>([]);

  function loggingData(data: LoggingData) {
    // 현재 시간 추가
    const dataWithTimestamp = {
      ...data,
      timestamp: new Date().toLocaleTimeString(),
      level: data.level || "INFO",
    };

    // 최대 10개로 제한하여 로그 저장 (최신 로그가 맨 위에 오도록)
    setLogs((prevLogs) => [dataWithTimestamp, ...prevLogs].slice(0, 20));
  }

  useEffect(() => {
    return window.ipc.on("ipc-back-logging", loggingData);
  }, []);

  return (
    <Box
      width="100%"
      p={2}
      bg="gray.50"
      borderRadius="md"
      boxShadow="sm"
      fontSize="xs"
      overflowY="auto"
      maxHeight="300px"
    >
      <Text fontWeight="bold" mb={2} fontSize="xs">
        실시간 로그 ({logs.length})
      </Text>
      <Divider mb={2} />

      {logs.length === 0 ? (
        <Text fontSize="xs" color="gray.500">
          로그 데이터가 없습니다...
        </Text>
      ) : (
        <VStack spacing={1} align="stretch">
          {logs.map((log, index) => (
            <Box
              key={index}
              p={1}
              bg="white"
              borderRadius="sm"
              borderLeft="3px solid"
              borderLeftColor={log.level === "ERROR" ? "red.400" : "blue.400"}
            >
              <HStack spacing={1} mb={1}>
                <Badge
                  size="sm"
                  colorScheme={log.level === "ERROR" ? "red" : "blue"}
                  fontSize="2xs"
                >
                  {log.level}
                </Badge>
                <Text fontSize="2xs" color="gray.500">
                  {log.timestamp}
                </Text>
                <Text fontSize="2xs" fontWeight="bold">
                  {log.functionName}
                </Text>
              </HStack>
              <Text fontSize="2xs" ml={1} color="gray.700" isTruncated>
                {typeof log.args === "object"
                  ? JSON.stringify(log.args)
                  : log.args}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}
