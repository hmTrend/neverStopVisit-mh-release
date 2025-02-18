import { exec } from "child_process";
import { promisify } from "util";
const exec2 = promisify(exec);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class TetheringMode {
  static checkAdbConnection() {
    try {
      return new Promise((resolve) => {
        exec("adb devices", (err, stdout) => {
          if (err) {
            console.error("ADB connecting fail");
            resolve(false); // 연결 실패 시 false 반환
            return;
          }
          // stdout에서 첫 번째 장치 상태 가져오기
          const arrDeviceStatus = stdout
            .split("\n")
            .map((value) => value.trim());
          const arrDeviceStatusSplit = arrDeviceStatus
            .map((value) => value.split("\t"))
            .filter(
              (array) => array.length > 1 && array[0] !== "" && array[1] !== "",
            );

          const findDeviceResult = findDevice(arrDeviceStatusSplit);

          if (findDeviceResult === null) return resolve(false);
          return resolve(findDeviceResult);
        });
      });
    } catch (e) {
      throw new Error(`checkAdbConnection() > ${e.message}`);
    }

    function findDevice(arr) {
      try {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][1] === "device") {
            return arr[i][0];
          }
        }
        return null;
      } catch (e) {
        throw new Error(`findDevice() > ${e.message}`);
      }
    }
  }

  static async phoneIpChange(device = "") {
    try {
      let stdout = await exec2(`adb -s ${device} shell svc data disable`);
      console.log(`tethering mode activated: ${stdout}`);
      await sleep(1000);
      stdout = await exec2(`adb -s ${device} shell svc data enable`);
      await sleep(1000);
      console.log(`tethering mode deactivated: ${stdout}`);
      await sleep(3000);
      return { data: "", error: "", message: "Phone Ip Changed" };
    } catch (e) {
      throw new Error(`Phone Ip Not Changed`);
    }
  }
}
