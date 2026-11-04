import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Invest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
<html
  lang="pt-BR"
  suppressHydrationWarning
>
  <body className="vsc-initialized">
      <Navbar />
      {children}
  </body>
</html>
  );
}
