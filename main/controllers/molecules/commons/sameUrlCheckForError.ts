import { gotoPage } from "./gotoPage";
import { Page } from "playwright";
import { DataCookieUnder19 } from "../../atoms/user/data.cookie";

export async function sameUrlCheckForError({
  checkUrl = "https://nid.naver.com/mobile/user/help/",
  page = undefined,
  browserManager = undefined,
  isTest = false,
}: {
  checkUrl?: string;
  page?: Page;
  browserManager?: any;
  isTest?: boolean;
} = {}) {
  if (isTest) {
    const { getPage } = await gotoPage({
      url: "https://m.smartstore.naver.com/delivery_juice/products/8469220192?nl-query=%EC%A0%84%EC%9E%90%EB%8B%B4%EB%B0%B0%EC%95%A1%EC%83%81+%EC%95%8C%EB%A1%9C%EC%97%90%EB%B2%A0%EB%9D%BC&nl-ts-pid=iJe1AsqVWT8ssdBmNfNssssss4w-440183&NaPm=ct%3Dm7afisc8%7Cci%3D3670cbf463c24c2ef5d60c999fad515e5ffd89be%7Ctr%3Dsls%7Csn%3D7531275%7Chk%3Dbc6cd2edb286b962266291c46540427c1025e882",
      cookies: DataCookieUnder19,
    });
    page = getPage;
  }
  try {
    const networkManager = browserManager.createNetworkManager();
    await networkManager.waitForAllRequests();
    const currentUrl = page.url();
    if (currentUrl.includes(checkUrl)) {
      throw Error(`${checkUrl}`);
    }
  } catch (e) {
    console.error(`sameUrlCheckForError > ${e.message}`);
    throw Error(`sameUrlCheckForError > ${e.message}`);
  }
}

// sameUrlCheckForError();
