import type { BlocksContent } from '@strapi/blocks-react-renderer'
import qs from 'qs'

export type GlobalSettingResponse = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  siteName?: string;
  companyName?: string;
  navigation?: Array<{
    links?: Array<{
      title?: number;
      url?: string;
      id?: number;
    }>
  }>;
  logo?: {
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    url?: string;
  }
};

export type PageResponse = {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  slug: string;
};

type SeoImage = {
  url?: string
  formats?: {
    small?: {
      url?: string
    }
  }
}

export type SeoResponse = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    schemaType?: string;
    llmSummary?: BlocksContent;
    seoImage?: SeoImage;
  }
};

type CMSResponse<Data> = {
  data: Data | Data[]
  meta?: Record<string, unknown>
  error?: {
    status: number
    name: string
    message: string
    details: never
  }
}


export function toAbsoluteStrapiUrl(url?: string): string | undefined {
  if (!url) return undefined
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  const domain = (process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.NEXT_PUBLIC_CMS_URL ||
    process.env.STRAPI_URL ||
    'http://strapi-dev:1337').replace(/\/$/, '')
  return `${domain}${url}`
}

type GetCmsDataFn = <ResponseType> (
  endpoint: string,
  queryParams?: Record<string, unknown>
) => Promise<CMSResponse<ResponseType>>

export const getCmsData: GetCmsDataFn = async (endpoint, queryParams) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    process.env.STRAPI_URL ||
    'http://strapi-dev:1337'
  const queryString = qs.stringify(queryParams, { encodeValuesOnly: true })
  const url = `${baseUrl}/api/${endpoint}${queryString ? `?${queryString}` : ''}`
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Failed to fetch from ${url}: ${response.statusText}`)
  const data = await response.json()
  return data
}

