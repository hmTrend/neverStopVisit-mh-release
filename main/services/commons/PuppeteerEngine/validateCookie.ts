export function validateCookie(cookie) {
  try {
    // 1. 기본 필수 필드 확인
    const requiredFields = ["name", "value", "domain"];
    const isValidStructure = cookie.every((c) =>
      requiredFields.every((field) => {
        const hasField = field in c;
        const isNotEmpty = c[field] && c[field].toString().trim().length > 0;
        return hasField && isNotEmpty;
      }),
    );

    if (!isValidStructure) {
      console.error("쿠키 필수 필드 누락");
      return false;
    }

    return true;
  } catch (error) {
    console.error("쿠키 검증 중 오류 발생:", error);
    return false;
  }
}
