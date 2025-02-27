import { EventEmitter } from "events";
import { ipcBackLogging } from "../../molecules/ipc/ipc.back.logging";
import { globalBrowsers, globalMainWindow } from "../../../lib/const/constVar";

const logger = new EventEmitter();

logger.on("log", (data) => {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] [${data.level}] [${data.functionName}] - ${data.message}`,
  );
});

// 에러 이벤트 리스너 설정
logger.on("error", (data) => {
  const timestamp = new Date().toISOString();
  console.error(
    `[${timestamp}] [ERROR] [${data.functionName}] - ${data.message}`,
  );
  console.error("에러 상세 정보:", data.error);
});

function withLogging(fn, functionName) {
  return async function (...args) {
    // 함수 시작 로그
    const fnStartArgs = args.length
      ? JSON.stringify(args).substring(0, 100)
      : "인자 없음";
    logger.emit("log", {
      level: "INFO",
      functionName,
      message: `함수 시작: ${fnStartArgs}`,
    });
    ipcBackLogging({
      mainWindow: globalMainWindow.mainWindow,
      data: { functionName, args: fnStartArgs },
    });

    try {
      // 실제 함수 실행
      const result = await fn.apply(this, args);
      const fnEndArgs =
        result !== undefined
          ? JSON.stringify(result).substring(0, 100)
          : "반환값 없음";
      // 함수 종료 로그
      logger.emit("log", {
        level: "INFO",
        functionName,
        message: `함수 종료: ${fnEndArgs}`,
      });
      ipcBackLogging({
        mainWindow: globalMainWindow.mainWindow,
        data: { functionName, args: fnEndArgs },
      });

      return result;
    } catch (error) {
      // 에러 로그
      logger.emit("error", {
        functionName,
        message: "함수 실행 중 에러 발생",
        error,
      });

      throw error; // 에러를 다시 던져서 호출자에게 전달
    }
  };
}

export { logger, withLogging };
