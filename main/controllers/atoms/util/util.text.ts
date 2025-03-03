export class UtilText {
  static errorMessageTrans({ errMessage }: { errMessage: string }) {
    console.log("errMessage 333322222111111");
    console.log(errMessage);
    if (errMessage.includes("this is login button")) {
      return "로그인 풀림";
    }
    if (errMessage.includes("Complete the day's counting tasks")) {
      return "당일작업완료";
    }
    if (errMessage.includes("#_sr_lst_")) {
      return "상품 미발견";
    }
    if (errMessage.includes("https://nid.naver.com/mobile/user/help/")) {
      return "19세 제한";
    }
    if (errMessage.includes("블로그 리뷰")) {
      return "블로그리뷰 없음";
    }
    return errMessage;
  }
}
