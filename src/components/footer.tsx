import { Container } from "@/components/ui/container";
import menu from "@/utils/data/static/menu.json";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const date = new Date();
  return (
    <footer className="bg-black py-18">
      <Container className="flex flex-col gap-y-8 md:flex-row justify-between">
        <div className="flex flex-col gap-y-24">
          <div className="flex flex-row md:flex-col justify-between md:justify-start gap-x-8 md:gap-y-8">
            <Image
              src="/svg/logo-white.svg"
              alt="RoadReady"
              width={100}
              height={44}
            />
            <div className="flex gap-x-8 text-white">
              <a href="https://www.facebook.com/share/1BqMX4e4Ww/?mibextid=wwXIfr">
                <Facebook size={32} strokeWidth={1.5} />
              </a>
              <a href="https://www.instagram.com/roadready.vegas?igsh=MTBlMHBnMm5ucGo0Ng%3D%3D&utm_source=qr">
                <Instagram size={32} strokeWidth={1.5} />
              </a>
              <a href="https://maps.app.goo.gl/LQc23boJ7tDeg7b97?g_st=ipc">
                <Image
                  src="/svg/google.svg"
                  alt="Google"
                  width={32}
                  height={32}
                  className="invert"
                />
              </a>
            </div>
          </div>
          <p className="text-white hidden md:block">
            Copyright © {date.getFullYear()}. All rights reserved. Road Ready
            Driving School. <br />
            DMV License PRDS53720
          </p>
        </div>
        <div className="flex gap-x-28">
          <ul className="flex flex-col gap-y-4 text-white">
            {menu.links.map(
              (link, i) =>
                i !== menu.links.length - 1 && (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
            )}
          </ul>
          <ul className="flex flex-col gap-y-4 text-white">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="transition-colors hover:text-primary"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-white text-center block md:hidden">
          Copyright © {date.getFullYear()}. All rights reserved. Road Ready
          Driving School. DMV License PRDS53720
        </p>
      </Container>
    </footer>
  );
};
