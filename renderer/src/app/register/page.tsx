import { Metadata } from "next";
import { App } from "@/components/register/App";

export const metadata: Metadata = {
  title: "NSV - 시작",
};

export default function Page() {
  return <App />;
}
