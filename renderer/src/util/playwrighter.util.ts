export class PlaywrighterUtil {
  static extractCTATCookie(cookiesArray) {
    const cookiesArrayParse = JSON.parse(cookiesArray);
    // Find CT_AT cookie from the array
    const ctAtCookie = cookiesArrayParse.find(
      (cookie) => cookie.name === "CT_AT",
    );
    // If CT_AT cookie is not found, return empty array
    if (!ctAtCookie) {
      return null;
    }
    return ctAtCookie.value;
  }
}
