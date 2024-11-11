export class CommonUtil {
  static maskLast4Digits(str) {
    try {
      if (!str) return str;
      const maskedPart = "*".repeat(4);
      return str.slice(0, -4) + maskedPart;
    } catch (e) {
      console.error(e.message);
      return str;
    }
  }
}
