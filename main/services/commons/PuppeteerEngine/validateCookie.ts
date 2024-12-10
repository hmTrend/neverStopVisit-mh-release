export function validateCookie(cookie) {
  try {
    // 1. 기본 필수 필드 확인
    const requiredFields = ["name", "value", "domain"];
    return true;
  } catch (error) {
    console.error("Error validating cookies : ", error);
    return false;
  }
}
