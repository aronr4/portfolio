import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins, Inter } from "next/font/google";
import SmoothScroll from "@/providers/SmoothScroll";
import { ContactModalProvider } from "@/providers/ContactModal";
import Preloader from "@/components/layout/Preloader";
import Nav from "@/components/layout/Nav";
import Cursor from "@/components/layout/Cursor";
import PageTransition from "@/components/layout/PageTransition";
import Footer from "@/components/layout/Footer";
import ContactModal from "@/components/layout/ContactModal";
import { siteConfig } from "@/data/site";
import "./globals.css";

const clashGrotesk = localFont({
  src: "../../public/fonts/ClashGrotesk-Semibold.woff2",
  weight: "600",
  variable: "--font-clash-grotesk",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashGrotesk.variable} ${poppins.variable} ${inter.variable} font-body antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if('scrollRestoration' in history){history.scrollRestoration='manual';}window.scrollTo(0,0);`,
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-fg overflow-x-hidden selection:bg-[#23282D] selection:text-white">
        <ContactModalProvider>
          <SmoothScroll>
            <Cursor />
            <Nav />
            <PageTransition>
              <div className="flex flex-col min-h-screen">
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </PageTransition>
            <ContactModal />
          </SmoothScroll>
        </ContactModalProvider>
      </body>
    </html>
  );
}
