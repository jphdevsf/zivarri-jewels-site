import type { BlocksContent } from '@strapi/blocks-react-renderer'

// Banner types
export type Banner =
    | CardBanner
    | SectionHeaderBanner
    | FreeformTextBanner
    | GalleryBanner
    | CardListBanner;

export interface BaseBanner {
    id: number | string;
    __component: string;
}

export interface CardBanner extends BaseBanner {
    __component: 'content.card';
    lockup: {
        id: number;
        leadin: string;
        title: string;
        subtitle: string;
        price: string;
        links: Array<{
            id: number;
            title: string;
            url: string;
        }>;
    };
    schedule: {
        id: number;
        date_start: string;
        date_end: string;
    } | null;
    image: {
        id: number;
        altText: string;
        desktop: {
            id: number;
            documentId: string;
            url: string;
            width: number;
            height: number;
        };
        mobile: {
            id: number;
            documentId: string;
            url: string;
            width: number;
            height: number;
        };
    };
}

export interface SectionHeaderBanner extends BaseBanner {
    __component: 'content.section-header';
    lockup: {
        id: number;
        leadin: string;
        title: string;
        subtitle: string;
        price: string;
        links: Array<{
            id: number;
            title: string;
            url: string;
        }>;
    };
    schedule: {
        id: number;
        date_start: string;
        date_end: string;
    };
}

export interface FreeformTextBanner extends BaseBanner {
    __component: 'content.freeform-text';
    text: BlocksContent;
    schedule: {
        id: number;
        date_start: string;
        date_end: string;
    };
}

export interface GalleryBanner extends BaseBanner {
    __component: 'content.gallery';
    title: string;
    images: Array<{
        id: number;
        documentId: string;
        url: string;
        width: number;
        height: number;
        alternativeText?: string;
    }>;
    schedule: {
        id: number;
        date_start: string;
        date_end: string;
    } | null;
}

export interface CardListBanner extends BaseBanner {
    __component: 'content.card-list';
    title: string;
    carousel_desktop: boolean;
    carousel_mobile: boolean;
    cards: Array<{
        id: number;
        lockup: {
            id: number;
            leadin: string;
            title: string;
            subtitle: string;
            price: string;
            links: Array<{
                id: number;
                title: string;
                url: string;
            }>;
        };
        schedule: {
            id: number;
            date_start: string;
            date_end: string;
        } | null;
        image: {
            id: number;
            altText: string;
            desktop: {
                id: number;
                documentId: string;
                url: string;
                width: number;
                height: number;
            };
            mobile: {
                id: number;
                documentId: string;
                url: string;
                width: number;
                height: number;
            };
        };
    }>;
}