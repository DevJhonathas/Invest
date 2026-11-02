import type { Metadata } from "next";
import "./globals.css";
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
  <body>
      <Navbar />
      {children}
  </body>
</html>
  );
}
