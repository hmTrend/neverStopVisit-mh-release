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
  {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Whale/3.23.214.1 Safari/537.36",
    headers: {
      "sec-ch-ua": '"Whale";v="118", "Chromium";v="118", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-dest": "document",
    },
  },
  {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    headers: {
      "sec-ch-ua":
        '"Google Chrome";v="119", "Chromium";v="119", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-dest": "document",
    },
  },
  {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.2109.1",
    headers: {
      "sec-ch-ua": '"Edge";v="119", "Chromium";v="119", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-dest": "document",
    },
  },
  {
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    headers: {
      "sec-ch-ua":
        '"Google Chrome";v="120", "Chromium";v="120", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-dest": "document",
    },
  },
];

function createUserAgentWithPC() {
  return function () {
    const randomIndex = Math.floor(Math.random() * userAgentWithPC.length); // 인덱스를 랜덤으로 생성합니다.
    return userAgentWithPC[randomIndex];
  };
}
export const getNextCreateUserAgentWithPC = createUserAgentWithPC();
