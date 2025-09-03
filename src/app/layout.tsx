import { Footer } from "@/components/footer";
import { MainNavigation } from "@/components/main-navigation/main-navigation";
import { cn } from "@/lib/cn";
import { notoSans, poppins } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import { Testimonials } from "@/components/testimonials/testimonials";
import testimonials from "@/utils/data/static/testimonials.json";

export const metadata: Metadata = {
  title: "Road Ready",
  description: "Take the Wheel, Own the Road",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = testimonials;
  return (
    <html lang="en">
      <body className={cn(notoSans.variable, poppins.variable)}>
        <MainNavigation />
        {children}
        <Testimonials testimonials={data.testimonials} />
        <Footer />
      </body>
    </html>
  );
}
