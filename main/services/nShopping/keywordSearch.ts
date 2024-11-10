import { Page } from "playwright";

export const keywordSearch = ({ page }: { page: Page }) => {
  try {
    return { page };
  } catch (e) {
    console.error(e.message);
    throw Error("");
  }
};
