import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./style.css";

import Sidebar from "@/components/Sidebar";
import { locales } from "@/config";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return locales.map(lng => ({ lng }));
}

export const metadata: Metadata = {
  title: "Notes",
  description: "Record your notes",
};

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: { lng: string };
}>) {
  return (
    <html lang={lng}>
      <body className={inter.className}>
        <Header />
        <div className="container">
          <div className="main">
            <Sidebar lng={lng} />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
