import type { Metadata } from "next";
import { ReactNode } from 'react';


import "./globals.css";

export const metadata: Metadata = {
  title: "Aria Han",
  description: "Aria's portfolio",
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
