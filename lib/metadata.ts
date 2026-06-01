import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

type PageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
};

export function pageMetadata({
  title,
  description,
  path
}: PageMetadataOptions): Metadata {
  const metadataTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": "/rss.xml"
      }
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: metadataTitle,
      description
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description
    }
  };
}
