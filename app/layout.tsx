import type { Metadata } from "next";
import "katex/dist/katex.min.css";

import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

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
      <body className="font-sans antialiased">
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
        <SpeedInsights />
      </body>
    </html>
  );
}
