import type { Schema, Struct } from '@strapi/strapi';

export interface ContentHero extends Struct.ComponentSchema {
  collectionName: 'components_content_heroes';
  info: {
    description: '';
    displayName: 'hero';
    icon: 'chartBubble';
  };
  attributes: {
    lockup: Schema.Attribute.Component<'element.lockup', false>;
  };
}

export interface ElementImage extends Struct.ComponentSchema {
  collectionName: 'components_element_images';
  info: {
    description: '';
    displayName: 'image';
    icon: 'picture';
  };
  attributes: {
    altText: Schema.Attribute.String;
    desktop: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mobile: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ElementLockup extends Struct.ComponentSchema {
  collectionName: 'components_element_lockups';
  info: {
    displayName: 'lockup';
    icon: 'layer';
  };
  attributes: {
    badge: Schema.Attribute.String;
    leadin: Schema.Attribute.String;
    legal: Schema.Attribute.String;
    price: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
    icon: 'earth';
  };
  attributes: {
    llmSummary: Schema.Attribute.Blocks;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaKeywords: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    schemaType: Schema.Attribute.Enumeration<
      [
        'WebPage',
        'Article',
        'Product',
        'CollectionPage',
        'Event',
        'FAQPage',
        'LocalBusiness',
      ]
    > &
      Schema.Attribute.Required;
    seoImage: Schema.Attribute.Media<'images' | 'files'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.hero': ContentHero;
      'element.image': ElementImage;
      'element.lockup': ElementLockup;
      'seo.seo': SeoSeo;
    }
  }
}
