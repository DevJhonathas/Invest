import type { Metadata } from "next";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

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
      <Footer />
  </body>
</html>
  );
}
