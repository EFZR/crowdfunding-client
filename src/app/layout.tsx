import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import ToastProvider from "../providers/ToastProvider";
import "./globals.css";

/**
 * TODO:
 *  Tasks that can order the structure of the project.
 *
 * - Reorder every component and have a section of UI
 * - Move the styles file inside their components and not use other folder
 */

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
