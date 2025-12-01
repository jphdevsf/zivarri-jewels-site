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

export interface Schedule {
  id?: number;
  date_start?: string;
  date_end?: string;
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
export type StrapiImage = {
  id: number;
  documentId: string;
  url: string;
  width: number;
  height: number;
  alternativeText?: string;
  formats: {
    small: {
      url: string;
      width: number;
      height: number;
    }
    medium: {
      url: string;
      width: number;
      height: number;
    }
    thumbnail: {
      url: string;
      width: number;
      height: number;
    }
  }
}

export type CMSBlock =
  | HeroComponent
  | CardComponent
  | SectionHeaderComponent
  | FreeformTextComponent
  | GalleryComponent
  | CardListComponent
  | FormComponent;

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

export interface CmsComponent {
  id: number | string;
  __component: string;
  schedule: Schedule | null;
}

export interface HeroComponent extends CmsComponent {
  __component: 'content.hero';
  lockup: Lockup;
  image: ResponsiveImage;
  lockup_align: Lockup_align;
}

export interface CardComponent extends CmsComponent {
  __component: 'content.card';
  lockup: Lockup;
  image: ResponsiveImage
}

export interface SectionHeaderComponent extends CmsComponent {
  __component: 'content.section-header';
  lockup: Lockup;
}

export interface FreeformTextComponent extends CmsComponent {
  __component: 'content.freeform-text';
  text: BlocksContent;
}

export interface GalleryComponent extends CmsComponent {
  __component: 'content.gallery';
  title: string;
  images: Array<StrapiImage>;
}

export interface CardListComponent extends CmsComponent {
  __component: 'content.card-list';
  title: string;
  carousel_desktop: boolean;
  carousel_mobile: boolean;
  cards: CardComponent[];
}

export interface FormComponent extends CmsComponent {
  __component: 'content.contact-form';
  title: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}