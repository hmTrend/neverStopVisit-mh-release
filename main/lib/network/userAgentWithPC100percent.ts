const userAgentWithPC = [
  {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.57",
    headers: {
      "sec-ch-ua": '"Edge";v="118", "Chromium";v="118", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-dest": "document",
    },
  },
];

function createUserAgentWithPC100percent() {
  return function () {
    const randomIndex = Math.floor(Math.random() * userAgentWithPC.length); // 인덱스를 랜덤으로 생성합니다.
    return userAgentWithPC[randomIndex];
  };
}
export const getNextCreateUserAgentWithPC100percent =
  createUserAgentWithPC100percent();
