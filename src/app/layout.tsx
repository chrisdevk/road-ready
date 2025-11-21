import { Footer } from "@/components/footer";
import { MainNavigation } from "@/components/main-navigation/main-navigation";
import { PhoneBubble } from "@/components/phone-bubble";
import { Testimonials } from "@/components/testimonials/testimonials";
import { cn } from "@/lib/cn";
import { notoSans, poppins } from "@/lib/fonts";
import testimonials from "@/utils/data/static/testimonials.json";
import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ND8E1M0Z6B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ND8E1M0Z6B');
          `}
        </Script>
      </head>
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
