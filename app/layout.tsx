import type { Metadata } from "next";
import { ReactNode } from 'react';


import "./globals.css";

export const metadata: Metadata = {
  title: "Aria Han",
  description: "Aria Han's personal portfolio",
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <head>
        <title>Aria Han</title>
        <link rel="icon" href="/favicon.ico"/>
    </head>
    <body>{children}</body>
    </html>
  );
}
