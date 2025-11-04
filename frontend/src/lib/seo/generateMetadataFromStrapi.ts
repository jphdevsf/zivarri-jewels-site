import type { Metadata } from "next";

export async function generateMetadataFromStrapi(slug: string): Promise<Metadata> { 
  const res = await fetch(`http://strapi-dev:1337/api/pages?filters[slug][$eq]=${slug}&populate=*`);
  const data = await res.json();

  if (!data?.data || data.data.length === 0) return {};

  const page = data.data[0];
  const seo = page;
  const imageUrl = seo?.seoImage?.data?.url;
  if (!page) return {};
  return {
    title: seo?.metaTitle || page.title,
    description: seo?.metaDescription || page.title,
    keywords: seo?.metaKeywords?.split(",").map((k : string) => k.trim()),
    alternates: {
      canonical: `https://yourdomain.com/${slug}`,
    },
    openGraph: {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      url: `https://yourdomain.com/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: seo?.schemaType || "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}