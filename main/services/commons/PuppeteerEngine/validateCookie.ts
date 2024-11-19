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

    // 3. 도메인 형식 검증
    const isValidDomain = cookie.every((c) => {
      const domainRegex =
        /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
      return domainRegex.test(c.domain.replace(/^\./, "")); // 앞의 점 제거 후 검증
    });

    if (!isValidDomain) {
      console.error("유효하지 않은 도메인 형식");
      return false;
    }

    return true;
  } catch (error) {
    console.error("쿠키 검증 중 오류 발생:", error);
    return false;
  }
}
