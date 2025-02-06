const userAgentWithDRSoftKorea241207WithOutIPhone = [
  {
    userAgent:
      "Mozilla/5.0 (Linux; Android 14; SM-F731N Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.6778.104 Mobile Safari/537.36 BizWebView",
    headers: {
      "sec-ch-ua":
        '"Android WebView";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
    },
  },
];

function createUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent() {
  return function () {
    const randomIndex = Math.floor(
      Math.random() * userAgentWithDRSoftKorea241207WithOutIPhone.length,
    ); // 인덱스를 랜덤으로 생성합니다.
    return userAgentWithDRSoftKorea241207WithOutIPhone[randomIndex];
  };
}
export const getNextCreateUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent =
  createUserAgentWithDRSoftKoreaWithOutIPhoneIN100percent();
