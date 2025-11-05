import type { Metadata } from "next";
import { getMediaUrl, getPageBySlug } from "@/lib/strapi/client";

export async function generateMetadataFromStrapi(slug: string): Promise<Metadata> {
  const page = await getPageBySlug(slug, { next: { revalidate: 60 } });
  if (!page) return {};

  const seo = page.seo || {};
  const imageUrl = getMediaUrl(seo?.seoImage);

  // Map Strapi SEO schemaType to a valid Next.js Open Graph type.
  // Next supports: 'website' | 'article' | 'book' | 'profile' |
  // 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' |
  // 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other'
  const mapSchemaTypeToOg = (t?: string):
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other' => {
    switch (t) {
      case 'Article':
        return 'article';
      // Non-supported Strapi values default to 'website'
      case 'WebPage':
      case 'Product':
      case 'CollectionPage':
      case 'Event':
      case 'FAQPage':
      case 'LocalBusiness':
      default:
        return 'website';
    }
  };

  return {
    title: seo?.metaTitle || page.title,
    description: seo?.metaDescription || page.title,
    keywords: seo?.metaKeywords?.split(",").map((k: string) => k.trim()),
    alternates: {
      canonical: `https://yourdomain.com/${slug}`,
    },
    openGraph: {
      title: seo?.metaTitle || page.title,
      description: seo?.metaDescription || page.title,
      url: `https://yourdomain.com/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: mapSchemaTypeToOg((seo as any)?.schemaType),
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || page.title,
      description: seo?.metaDescription || page.title,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}