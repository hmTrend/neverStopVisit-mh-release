export class UtilText {
  static errorMessageTrans({ errMessage }: { errMessage: string }) {
    console.log("errMessage 333322222111111");
    console.log(errMessage);
    if (errMessage.includes("#_sr_lst_")) {
      return "상품 미발견";
    }
    if (errMessage.includes("https://nid.naver.com/mobile/user/help/")) {
      return "19세 제한";
    }
    return errMessage;
  }
}
