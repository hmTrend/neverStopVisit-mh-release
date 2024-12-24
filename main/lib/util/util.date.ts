export class UtilDate {
  static getCurrentDate() {
    /**
     * 리턴예: "12.24 00:00"
     * **/
    const now = new Date();

    // 월과 일 가져오기 (월은 0부터 시작하므로 1을 더함)
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // 시간과 분 가져오기
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    // 원하는 형식으로 조합
    return `${month}.${day} ${hours}:${minutes}`;
  }
}
