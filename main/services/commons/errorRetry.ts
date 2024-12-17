import wait from "waait";

export const errorRetryBoundery = async ({
  fn,
  retryCount = 3,
  waitCount = 3 * 1000,
}) => {
  for (let i = 0; i <= retryCount; i++) {
    try {
      await fn();
      return;
    } catch (e) {
      await wait(waitCount);
      console.error(`${i} retryCount, ${e.message}`);
      if (i === 3) {
        return console.error(`ERR > errorRetry : ${e.message}`);
      }
    }
  }
};
