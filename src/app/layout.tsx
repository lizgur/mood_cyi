import Cart from "@/layouts/components/cart/Cart";
import OpenCart from "@/layouts/components/cart/OpenCart";
import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import "@/styles/main.css";
import { Wallpoet, Cute_Font } from "next/font/google";
import { Metadata } from "next";

// Load Google Fonts with Next.js optimization
const wallpoet = Wallpoet({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-wallpoet",
});

const cuteFont = Cute_Font({
  weight: "400", 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cute",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.site.base_url),
  title: config.site.title,
  description: config.metadata.meta_description,
  openGraph: {
    url: config.site.base_url,
    type: 'website',
    title: config.site.title,
    description: config.metadata.meta_description,
    images: [
      {
        url: config.metadata.meta_image,
        width: 1200,
        height: 630,
        alt: config.site.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.site.title,
    description: config.metadata.meta_description,
    images: [config.metadata.meta_image],
  },
  authors: [{ name: config.metadata.meta_author }],
  alternates: {
    canonical: config.site.base_url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en" className={`${wallpoet.variable} ${cuteFont.variable}`}>
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="theme-name" content="commerceplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />

        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <Providers>
          <Header>
            <OpenCart />
            <Cart />
          </Header>
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
