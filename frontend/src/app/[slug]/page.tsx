import { notFound } from 'next/navigation';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { generateMetadataFromStrapi } from '@/lib/seo/generateMetadataFromStrapi';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return await generateMetadataFromStrapi(slug);
}

export default async function Page( { params}: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`http://strapi-dev:1337/api/pages?filters[slug][$eq]=${slug}&populate=*`);
  const data = await res.json();
  
  if (!data?.data || data.data.length === 0) return notFound();
  
  const page = data.data[0];
  if (!page) return notFound();
  return (
    <main>
      <BlocksRenderer content={page.text} />
    </main>
  );
}
