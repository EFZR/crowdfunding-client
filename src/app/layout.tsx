import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import ToastProvider from "../providers/ToastProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--body-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Crowdfunding",
  description: "Crowdfunding app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={poppins.variable}>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
