import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const NotoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400"]});
export const metadata: Metadata = {
  title: "Comerce-APP-Practice",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${NotoSansJP} ${NotoSansJP} antialiased`}>
        <Header />
        {children}</body>
    </html>
  );
}

