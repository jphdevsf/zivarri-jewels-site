import type { BlocksContent } from '@strapi/blocks-react-renderer'
import type { Banner } from './content'

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

export type PageAndSeoResponse = {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    title: string;
    slug: string;
    banners?: Banner[];
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        metaKeywords?: string;
        schemaType?: string;
        llmSummary?: BlocksContent;
        seoImage?: SeoImage;
    }
};

type SeoImage = {
    url?: string
    formats?: {
        small?: {
            url?: string
        }
    }
}

export type CMSResponse<Data> = {
    data: Data | Data[]
    meta?: Record<string, unknown>
    error?: {
        status: number
        name: string
        message: string
        details: never
    }
}

export type GetCmsDataFn = <ResponseType> (
    endpoint: string,
    queryParams?: Record<string, unknown>
) => Promise<CMSResponse<ResponseType>>