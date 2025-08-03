export function parseCookieString(cookieString: string) {
  try {
    if (!cookieString || typeof cookieString !== 'string') {
      console.error("유효하지 않은 쿠키 문자열:", cookieString);
      return [];
    }

    // 쿠키 문자열이 JSON 형태인지 확인
    if (cookieString.trim().startsWith('[') || cookieString.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(cookieString);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (e) {
        console.error("JSON 쿠키 파싱 실패:", e.message);
      }
    }

    // 일반적인 쿠키 문자열 파싱 (예: "name1=value1; name2=value2")
    const cookies = [];
    const cookiePairs = cookieString.split(';');

    for (const pair of cookiePairs) {
      const trimmedPair = pair.trim();
      if (!trimmedPair) continue;

      const [name, ...valueParts] = trimmedPair.split('=');
      const value = valueParts.join('='); // = 문자가 값에 포함될 수 있음

      if (name && value) {
        cookies.push({
          name: name.trim(),
          value: value.trim(),
          domain: '.example.com', // 기본 도메인 (필요시 수정)
          path: '/',
          httpOnly: false,
          secure: false,
          sameSite: 'Lax'
        });
      }
    }

    return cookies;
  } catch (error) {
    console.error("쿠키 문자열 파싱 중 오류:", error.message);
    return [];
  }
}
