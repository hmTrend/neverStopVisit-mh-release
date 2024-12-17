import { exec } from "child_process";
import { promisify } from "util";
import dns from "dns";
import http from "http";

const execAsync = promisify(exec);
const dnsLookup = promisify(dns.lookup);

export async function checkInternetConnection(): Promise<boolean> {
  // 여러 신뢰할 수 있는 호스트들을 체크
  const hosts = ["google.com", "cloudflare.com", "8.8.8.8", "1.1.1.1"];

  const checks = await Promise.all([
    // DNS 확인
    checkDNS(hosts[0]),
    // HTTP 연결 확인
    checkHTTP(hosts[0]),
    // Ping 확인
    checkPing(hosts[1]),
  ]);

  // 최소 2개 이상의 체크가 성공하면 인터넷이 연결된 것으로 판단
  return checks.filter(Boolean).length >= 2;
}

async function checkDNS(host: string): Promise<boolean> {
  try {
    await dnsLookup(host);
    return true;
  } catch {
    return false;
  }
}

async function checkHTTP(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    const request = http.get(`http://${host}`, { timeout: 5000 }, (res) => {
      request.destroy();
      resolve(res.statusCode !== undefined);
    });

    request.on("error", () => {
      request.destroy();
      resolve(false);
    });

    request.on("timeout", () => {
      request.destroy();
      resolve(false);
    });
  });
}

async function checkPing(host: string): Promise<boolean> {
  try {
    const platform = process.platform;
    const pingCommand =
      platform === "win32"
        ? `ping -n 1 -w 3000 ${host}`
        : `ping -c 1 -W 3 ${host}`;

    await execAsync(pingCommand);
    return true;
  } catch {
    return false;
  }
}
