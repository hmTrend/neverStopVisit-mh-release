import { exec } from "child_process";
import { promisify } from "util";
const execAsync = promisify(exec);
import os from "os";
import dns from "dns";
import waait from "waait";
import macAddress from "mac-address";

function generateRandomMac(): string {
  return Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0"),
  ).join(":");
}

let generatedMacs = new Set<string>();

function generateUniqueMac(): string {
  let newMac: string;

  do {
    const buffer = Buffer.alloc(6);
    for (let i = 0; i < 6; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    // 유니캐스트, 로컬 주소로 설정
    buffer[0] = (buffer[0] & 0xfc) | 0x02;

    newMac = macAddress.toString(buffer);
  } while (generatedMacs.has(newMac));

  generatedMacs.add(newMac);
  return newMac;
}

export async function changeMacAddress({
  networkAdapterName = "이더넷",
  nowMacAddress,
}): Promise<string> {
  const newMacAddress = generateUniqueMac();
  if (nowMacAddress === newMacAddress) {
    throw new Error("MAC address SAME.");
  }
  const command = `$confirmationPreference = 'None'; Set-NetAdapter -Name '${networkAdapterName}' -MacAddress '${newMacAddress}' -Confirm:$false`;

  try {
    const { stderr } = await execAsync(`powershell.exe -Command "${command}"`);

    if (stderr) {
      throw new Error(`stderr: ${stderr}`);
    }
    return `MAC ADDRESS SUCCESS. NEW MAC ADDRESS : ${newMacAddress}`;
  } catch (error) {
    throw new Error(`ERROR 777: ${error.message}`);
  }
}

export async function checkNetworkConnection() {
  const command = `
    $ethernet = Get-NetAdapter | Where-Object {$_.Name -eq "이더넷" -and $_.Status -eq "Up"}
    if ($ethernet) {
      Write-Output "Ethernet is connected."
      $ethernet | Select-Object Name, InterfaceDescription, Status | ConvertTo-Json
    } else {
      Write-Output "Ethernet is not connected."
    }
  `;

  try {
    const { stdout, stderr } = await execAsync(command, {
      shell: "powershell.exe",
    });

    if (stderr) {
      throw new Error(`stderr: ${stderr}`);
    }

    const isConnected = stdout.includes("Ethernet is connected.");

    return {
      isConnected: isConnected,
      message: isConnected
        ? "Ethernet is connected"
        : "Ethernet is not connected",
    };
  } catch (error) {
    throw new Error(`Error occurred during execution: ${error.message}`);
  }
}
interface GetMacAddressOptions {
  networkAdapterName?: string;
  mainWindow?: any; // 실제 타입은 Electron의 BrowserWindow 또는 사용 중인 UI 프레임워크에 따라 다를 수 있습니다.
}

export async function getMacAddress({
  networkAdapterName = "이더넷",
} = {}): Promise<string> {
  const command = `Get-NetAdapter -Name '${networkAdapterName}' | Select-Object -ExpandProperty MacAddress`;

  try {
    const { stdout, stderr } = await execAsync(
      `powershell.exe -Command "${command}"`,
    );

    if (stderr) {
      throw new Error(`PowerShell 오류: ${stderr}`);
    }

    const macAddress = stdout.trim();
    if (!macAddress) {
      throw new Error(
        `'${networkAdapterName}' 어댑터의 MAC 주소를 찾을 수 없습니다.`,
      );
    }
    return macAddress;
  } catch (error) {
    throw new Error(`오류 발생: ${error.message}`);
  }
}

const dnsLookup = promisify(dns.lookup);

let previousMac = "";
const checkInterval = 3000; // 5초마다 확인

function getLocalMacAddress(): string | null {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const networkInterface = networkInterfaces[interfaceName];
    if (networkInterface) {
      for (const item of networkInterface) {
        if (item.family === "IPv4" && !item.internal) {
          return item.mac;
        }
      }
    }
  }
  return null;
}

async function checkInternetConnection(): Promise<boolean> {
  try {
    await dnsLookup("google.com");
    return true;
  } catch (error) {
    return false;
  }
}

async function checkNetworkStatus(): Promise<boolean> {
  const currentMac = getLocalMacAddress();
  const isConnected = await checkInternetConnection();

  if (isConnected) {
    console.log(`IP address changed: ${previousMac} -> ${currentMac}`);
    console.log("network connection success");
    previousMac = currentMac;
    return true;
  } else {
    console.log("IP address changing OR internet connecting...");
    previousMac = currentMac || "";
    return false;
  }
}

export async function monitorNetworkAndStart(): Promise<void> {
  console.log("network connection monitoring start...");
  while (true) {
    const shouldStart = await checkNetworkStatus();
    if (shouldStart) {
      break; // 작업 시작 후 루프 종료
    }
    await waait(checkInterval);
  }
  console.log("network connection monitoring end");
}

// 함수 사용 예시
// checkNetworkConnection().then((value) => {
//   const { isConnected, message } = value;
//   console.log("isConnected");
//   console.log(isConnected);
//   console.log("message");
//   console.log(message);
// });

// changeMacAddress("이더넷");

// async function main() {
//   try {
//     const macAddress = await getMacAddress();
//     console.log(`ETHERNET MAC ADDRESS: ${macAddress}`);
//
//     // 특정 네트워크 어댑터의 MAC 주소를 가져오려면 다음과 같이 사용할 수 있습니다:
//     // const wifiMacAddress = await getMacAddress('Wi-Fi');
//     // console.log(`Wi-Fi MAC 주소: ${wifiMacAddress}`);
//   } catch (error) {
//     console.error(error.message);
//   }
// }
//
// main();
