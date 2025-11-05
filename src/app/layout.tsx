import { Footer } from "@/components/footer";
import { MainNavigation } from "@/components/main-navigation/main-navigation";
import { PhoneBubble } from "@/components/phone-bubble";
import { Testimonials } from "@/components/testimonials/testimonials";
import { cn } from "@/lib/cn";
import { notoSans, poppins } from "@/lib/fonts";
import testimonials from "@/utils/data/static/testimonials.json";
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
  const data = testimonials;
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(notoSans.variable, poppins.variable)}>
        <MainNavigation />
        {children}
        <Testimonials testimonials={data.testimonials} />
        <Footer />
        <PhoneBubble />
      </body>
    </html>
  );
}
