import { Page } from "playwright";
import { BrowserManager } from "../playwright/BrawserManager";
import { gotoPage } from "../../molecules/commons/gotoPage";

export async function networkRouterEdu({
  isTest = false,
  page = undefined,
  browserManager = undefined,
}: {
  isTest?: boolean;
  page?: Page;
  browserManager?: any;
} = {}) {
  if (isTest) {
    const { getPage, getBrowserManager } = await gotoPage({
      is3gMode: false,
      cpuThrottlingRate: 8,
      url: "https://m.smartstore.naver.com/brainiaccoffee/products/9223216138?NaPm=ct%3Dm7bgx1m8%7Cci%3Da8ff3659e7c60c235a3a9e2dc450df7b8209dedc%7Ctr%3Dslsl%7Csn%3D2289429%7Chk%3D09ab8c9ee88a8588fa5b622b5ad50dd26cdc29dd&nl-au=5fbc33cb424747269999a30a205c10ad&nl-query=%EC%BB%A4%ED%94%BC%EC%9B%90%EB%91%90+%EB%AC%B8%EC%A0%9C%EC%A0%81",
      // 200g 원두 커피 문제적커피 로스팅 브라질 세하도 [원산지:브라질] 모바일 상세정보 펼쳐보기 없음
    });
    page = getPage;
    browserManager = getBrowserManager;
  }
  try {
  } catch (e) {
    console.error(e.message);
  }
}
