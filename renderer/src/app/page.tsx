import { Metadata } from "next";
import { App } from "@/components/main/App";

export const metadata: Metadata = {
  title: "NSV - 메인",
};

export default function Page() {
  return <App />;
}
