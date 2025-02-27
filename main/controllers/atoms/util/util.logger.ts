import { EventEmitter } from "events";

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
    logger.emit("log", {
      level: "INFO",
      functionName,
      message: `함수 시작: ${args.length ? JSON.stringify(args) : "인자 없음"}`,
    });

    try {
      // 실제 함수 실행
      const result = await fn.apply(this, args);

      // 함수 종료 로그
      logger.emit("log", {
        level: "INFO",
        functionName,
        message: `함수 종료: ${result !== undefined ? JSON.stringify(result) : "반환값 없음"}`,
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
