
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
//import Script from "next/script";
import "./globals.css";
import { PopupProvider } from "@/components/PopupProvider";
import ContactModal from "@/components/ContactModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PANDAeCe | Performance Marketing",
  description: "Performance marketing agency for growing businesses.",
  icons: {
    icon: "/panda.png",
    shortcut: "/panda.png",
    apple: "/panda.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M4R6JM3V');
          `}
        </Script> */}
      </head>

      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M4R6JM3V"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}

        <PopupProvider>
          {children}
          <ContactModal />
        </PopupProvider>
      </body>
    </html>
  );
}

