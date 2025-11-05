import type { Schema, Struct } from '@strapi/strapi';

export interface ContentCard extends Struct.ComponentSchema {
  collectionName: 'components_content_cards';
  info: {
    displayName: 'card';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Component<'element.image', false>;
    lockup: Schema.Attribute.Component<'element.lockup', false>;
  };
}

export interface ContentCardList extends Struct.ComponentSchema {
  collectionName: 'components_content_card_lists';
  info: {
    description: '';
    displayName: 'cardList';
    icon: 'server';
  };
  attributes: {
    cards: Schema.Attribute.Component<'content.card', true>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary', 'tertiary']>;
  };
}

export interface ContentGallery extends Struct.ComponentSchema {
  collectionName: 'components_content_galleries';
  info: {
    description: '';
    displayName: 'Gallery';
    icon: 'apps';
  };
  attributes: {
    images: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentHero extends Struct.ComponentSchema {
  collectionName: 'components_content_heroes';
  info: {
    description: '';
    displayName: 'hero';
    icon: 'chartBubble';
  };
  attributes: {
    image: Schema.Attribute.Component<'element.image', false>;
    lockup: Schema.Attribute.Component<'element.lockup', false>;
    type: Schema.Attribute.Enumeration<['primary', 'secondary', 'tertiary']>;
  };
}

export interface ContentSectionHeader extends Struct.ComponentSchema {
  collectionName: 'components_content_section_headers';
  info: {
    description: '';
    displayName: 'Text Section';
    icon: 'layer';
  };
  attributes: {
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ElementButton extends Struct.ComponentSchema {
  collectionName: 'components_element_buttons';
  info: {
    displayName: 'Button';
    icon: 'arrowRight';
  };
  attributes: {
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary', 'tertiary']>;
    url: Schema.Attribute.String;
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

export interface ElementLink extends Struct.ComponentSchema {
  collectionName: 'components_element_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'arrowRight';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['primary', 'secondary', 'tertiary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementLockup extends Struct.ComponentSchema {
  collectionName: 'components_element_lockups';
  info: {
    description: '';
    displayName: 'lockup';
    icon: 'layer';
  };
  attributes: {
    badge: Schema.Attribute.String;
    leadin: Schema.Attribute.String;
    legal: Schema.Attribute.String;
    links: Schema.Attribute.Component<'element.link', true>;
    price: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'Footer';
    icon: 'layout';
  };
  attributes: {
    copyright_info: Schema.Attribute.String;
  };
}

export interface GlobalHeader extends Struct.ComponentSchema {
  collectionName: 'components_global_headers';
  info: {
    displayName: 'Header';
    icon: 'layout';
  };
  attributes: {
    links: Schema.Attribute.Component<'element.link', true>;
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
      'content.card': ContentCard;
      'content.card-list': ContentCardList;
      'content.gallery': ContentGallery;
      'content.hero': ContentHero;
      'content.section-header': ContentSectionHeader;
      'element.button': ElementButton;
      'element.image': ElementImage;
      'element.link': ElementLink;
      'element.lockup': ElementLockup;
      'global.footer': GlobalFooter;
      'global.header': GlobalHeader;
      'seo.seo': SeoSeo;
    }
  }
}
