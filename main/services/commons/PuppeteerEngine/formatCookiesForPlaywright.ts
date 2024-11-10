export const formatCookiesForPlaywright = (cookies) => {
  return cookies.map((cookie) => {
    // expires 값을 Date 객체로 변환 (밀리초 단위)
    const expiresDate = new Date(cookie.expires * 1000);

    // sameSite 값을 Playwright 형식으로 변환
    let sameSite;
    switch (cookie.sameSite?.toLowerCase()) {
      case "lax":
        sameSite = "Lax";
        break;
      case "strict":
        sameSite = "Strict";
        break;
      case "no_restriction":
        sameSite = "None";
        break;
      default:
        sameSite = "Lax"; // 기본값으로 Lax 설정
    }

    // Playwright cookie 형식에 맞게 변환
    return {
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path,
      expires: expiresDate.getTime() / 1000, // 초 단위로 변환
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite,
    };
  });
};
