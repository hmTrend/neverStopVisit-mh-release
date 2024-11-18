import { Page } from "playwright";
import { FetchFingerPrintTargetExcelOne } from "../../../lib/apollo/finger-print.apollo";

export const cookieNstateSave = async ({
  page,
  _id,
  nState,
}: {
  page: Page;
  _id: string;
  nState: string;
}) => {
  const cookies = await page.context().cookies();
  const { data } = await FetchFingerPrintTargetExcelOne({
    _id,
    cookie: JSON.stringify(cookies),
    nState,
  });
};
