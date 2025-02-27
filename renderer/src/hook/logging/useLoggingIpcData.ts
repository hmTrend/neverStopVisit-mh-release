import { useEffect } from "react";

export function useLoggingIpcData() {
  function loggingData(data) {
    console.log("data 33333");
    console.log(data);
    return data;
  }

  useEffect(() => {
    return window.ipc.on("ipc-back-logging", loggingData);
  }, []);
  return { loggingData };
}
