import { exec } from "child_process";
import { promisify } from "util";
import macAddress from "mac-address";
const execAsync = promisify(exec);

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
