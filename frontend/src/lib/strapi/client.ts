import type { BlocksContent } from '@strapi/blocks-react-renderer';

// Base Strapi URL. Prefer NEXT_PUBLIC_STRAPI_URL for both server and client usage.
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL || 'http://strapi-dev:1337';

// Generic Strapi response shapes
type StrapiItem<T> = { id: number; attributes?: T } & Record<string, unknown>;
type StrapiListResponse<T> = { data: Array<StrapiItem<T>>; meta?: unknown };

// Normalized frontend types
export type Page = {
  id: number;
  title: string;
  slug: string;
  published?: boolean;
  text?: BlocksContent | null;
  banners?: unknown;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    schemaType?: string;
    llmSummary?: BlocksContent | null;
    seoImage?: any;
  } | null;
};

// Helper to normalize Strapi v4 entries (flattens attributes)
function normalizeEntry<T>(item: StrapiItem<T>): T & { id: number } {
  if (!item) return item as unknown as T & { id: number };
  const { id, attributes, ...rest } = item as any;
  return (attributes ? { id, ...attributes } : { id, ...(rest as object) }) as T & { id: number };
}

// Returns an absolute URL for a Strapi media field (handles both data.url and data.attributes.url)
export function getMediaUrl(media: any | undefined | null): string | undefined {
  const url =
    media?.url ||
    media?.data?.url ||
    media?.data?.attributes?.url ||
    media?.attributes?.url ||
    undefined;

  if (!url) return undefined;
  return String(url).startsWith('http') ? String(url) : `${STRAPI_URL}${url}`;
}

// Thin wrapper around fetch for Strapi
export async function strapiFetch<T = any>(
  endpoint: string,
  init?: RequestInit & { next?: any }
): Promise<T> {
  const url = `${STRAPI_URL}${endpoint}`;
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Strapi request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

// Domain-specific queries
export async function getPageBySlug(
  slug: string,
  init?: RequestInit & { next?: any }
): Promise<Page | null> {
  const query = `?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
  const json = await strapiFetch<StrapiListResponse<Page>>(`/api/pages${query}`, init);
  const item = json?.data?.[0];
  if (!item) return null;
  return normalizeEntry<Page>(item);
}
