import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Dashboard",
  description: "CADD Centre Job Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} flex bg-gray-50 text-gray-800`}
        suppressHydrationWarning={true}
      >
        <Sidebar />
        <main className="flex-1 pl-64">{children}</main>
      </body>
    </html>
  );
}