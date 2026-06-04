import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import "katex/dist/katex.min.css";

import "./globals.css";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap"
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap"
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

export const metadata: Metadata = {
  ...pageMetadata({
    description: siteConfig.description,
    path: "/"
  }),
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${notoSansSc.variable} ${jetBrainsMono.variable} font-sans antialiased`}
      >
        <a href="#content" className="skip-link">
          跳到正文
        </a>
        <ThemeProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main id="content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
