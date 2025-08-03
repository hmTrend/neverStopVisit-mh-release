export const formatCookiesForPlaywright = (cookies) => {
  if (!cookies || !Array.isArray(cookies)) {
    console.error("유효하지 않은 쿠키 형식:", cookies);
    return [];
  }

  return cookies
    .map((cookie) => {
      if (!cookie) {
        console.error("쿠키 항목이 null 또는 undefined입니다.");
        return null;
      }

      try {
        // name, value, domain이 있는지 확인
        if (!cookie.name || !cookie.value || !cookie.domain) {
          console.error("쿠키 필수 필드 누락:", {
            name: !!cookie.name,
            value: !!cookie.value,
            domain: !!cookie.domain,
          });
          return null;
        }

        // expires 값 처리
        let expires;
        if (cookie.expires) {
          try {
            const expiresDate = new Date(cookie.expires * 1000);
            expires = expiresDate.getTime() / 1000; // 초 단위로 변환
          } catch (e) {
            console.error("expires 날짜 변환 오류:", e.message);
            expires = undefined;
          }
        }

        // sameSite 값을 Playwright 형식으로 변환
        let sameSite;
        if (cookie.sameSite && typeof cookie.sameSite === "string") {
          switch (cookie.sameSite.toLowerCase()) {
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
        } else {
          sameSite = "Lax"; // 기본값
        }

        // Playwright cookie 형식에 맞게 변환
        return {
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path || "/",
          expires: expires,
          httpOnly: !!cookie.httpOnly,
          secure: !!cookie.secure,
          sameSite,
        };
      } catch (error) {
        console.error("쿠키 항목 처리 중 오류:", error.message);
        return null;
      }
    })
    .filter((cookie) => cookie !== null); // null 값 제거
};
