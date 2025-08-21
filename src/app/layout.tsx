import { cn } from "@/lib/cn";
import { notoSans, poppins } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Road Ready",
  description: "Take the Wheel, Own the Road",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(notoSans.variable, poppins.variable)}>
        {children}
      </body>
    </html>
  );
}
