export function validateCookie(cookie) {
  try {
    // 쿠키가 null이나 undefined인 경우 검증 실패
    if (!cookie) {
      console.error("쿠키가 null 또는 undefined입니다.");
      return false;
    }

    // 쿠키가 배열이 아닌 경우 검증 실패
    if (!Array.isArray(cookie)) {
      console.error("쿠키가 배열 형식이 아닙니다:", typeof cookie);
      return false;
    }

    // 빈 배열 체크
    if (cookie.length === 0) {
      console.error("쿠키 배열이 비어 있습니다.");
      return false;
    }

    // 각 쿠키 항목 검증
    const requiredFields = ["name", "value", "domain"];
    for (const item of cookie) {
      if (!item) {
        console.error("쿠키 항목이 null 또는 undefined입니다.");
        return false;
      }

      // 필수 필드 확인
      for (const field of requiredFields) {
        if (item[field] === undefined || item[field] === null) {
          console.error(`쿠키 항목에 필수 필드가 없습니다: ${field}`);
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.error("쿠키 검증 중 오류 발생:", error);
    return false;
  }
}
