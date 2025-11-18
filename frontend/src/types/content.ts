import type { BlocksContent } from '@strapi/blocks-react-renderer'

// Helper interfaces (NOT exported)
interface ResponsiveImage {
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
}

interface Schedule {
  id: number;
  date_start: string;
  date_end: string;
}

interface Lockup_align {
  id: number;
  text_align: string;
  x_axis: string;
  y_axis: string;
  offset_top: number;
  offset_right: number;
  offset_bottom: number;
  offset_left: number;
}

// Exported types
export type BlockBanner =
  | HeroBanner
  | CardBanner
  | SectionHeaderBanner
  | FreeformTextBanner
  | GalleryBanner
  | CardListBanner;

export interface Lockup {
  id: number;
  text_align: string;
  width?: number;
  leadin?: string;
  title?: string;
  subtitle?: string;
  price?: string;
  links?: Array<{
    id: number;
    title: string;
    url: string;
  }>;
}

export interface BaseBanner {
  id: number | string;
  __component: string;
}

export interface HeroBanner extends BaseBanner {
  __component: 'content.hero';
  lockup: Lockup;
  image: ResponsiveImage;
  schedule: Schedule | null;
  lockup_align: Lockup_align;
}

export interface CardBanner extends BaseBanner {
  __component: 'content.card';
  lockup: Lockup;
  image: ResponsiveImage
  schedule: Schedule | null;
}

export interface SectionHeaderBanner extends BaseBanner {
  __component: 'content.section-header';
  lockup: Lockup;
  schedule: Schedule | null;
}

export interface FreeformTextBanner extends BaseBanner {
  __component: 'content.freeform-text';
  text: BlocksContent;
  schedule: Schedule | null;
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
  schedule: Schedule | null;
}

export interface CardListBanner extends BaseBanner {
  __component: 'content.card-list';
  title: string;
  carousel_desktop: boolean;
  carousel_mobile: boolean;
  cards: CardBanner[];
}