import type { Schema, Struct } from '@strapi/strapi';

export interface ContentCard extends Struct.ComponentSchema {
  collectionName: 'components_content_cards';
  info: {
    description: '';
    displayName: 'card';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Component<'element.image', false>;
    lockup: Schema.Attribute.Component<'element.lockup', false>;
    schedule: Schema.Attribute.Component<'element.schedule', false>;
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
    carousel_desktop: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    carousel_mobile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    schedule: Schema.Attribute.Component<'element.schedule', false>;
    title: Schema.Attribute.String;
  };
}

export interface ContentContactForm extends Struct.ComponentSchema {
  collectionName: 'components_content_contact_forms';
  info: {
    displayName: 'Contact Form';
    icon: 'bulletList';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface ContentFormDynamicZone extends Struct.ComponentSchema {
  collectionName: 'components_content_form_dynamic_zones';
  info: {
    description: '';
    displayName: 'Form';
    icon: 'expand';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface ContentFreeformText extends Struct.ComponentSchema {
  collectionName: 'components_content_freeform_texts';
  info: {
    description: '';
    displayName: 'Freeform Text';
    icon: 'layer';
  };
  attributes: {
    schedule: Schema.Attribute.Component<'element.schedule', false>;
    text: Schema.Attribute.Blocks;
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
    schedule: Schema.Attribute.Component<'element.schedule', false>;
    title: Schema.Attribute.String;
  };
}

export interface ContentHero extends Struct.ComponentSchema {
  collectionName: 'components_content_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Component<'element.image', false>;
    lockup: Schema.Attribute.Component<'element.lockup', false>;
    lockup_align: Schema.Attribute.Component<'element.alignment', false>;
    schedule: Schema.Attribute.Component<'element.schedule', false>;
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
    lockup: Schema.Attribute.Component<'element.lockup', false>;
    schedule: Schema.Attribute.Component<'element.schedule', false>;
  };
}

export interface ElementAlignment extends Struct.ComponentSchema {
  collectionName: 'components_element_alignments';
  info: {
    description: '';
    displayName: 'lockup_align';
    icon: 'filter';
  };
  attributes: {
    offset_bottom: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 25;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    offset_left: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 25;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    offset_right: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 25;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    offset_top: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 25;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    x_axis: Schema.Attribute.Enumeration<['center', 'left', 'right']> &
      Schema.Attribute.DefaultTo<'center'>;
    y_axis: Schema.Attribute.Enumeration<['center', 'top', 'bottom']> &
      Schema.Attribute.DefaultTo<'center'>;
  };
}

export interface ElementButton extends Struct.ComponentSchema {
  collectionName: 'components_element_buttons';
  info: {
    description: '';
    displayName: 'Button';
    icon: 'arrowRight';
  };
  attributes: {
    hierarchy: Schema.Attribute.Component<'element.hierarchy', false>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary', 'tertiary']>;
    url: Schema.Attribute.String;
  };
}

export interface ElementHierarchy extends Struct.ComponentSchema {
  collectionName: 'components_element_hierarchies';
  info: {
    description: '';
    displayName: 'Hierarchy';
    icon: 'gate';
  };
  attributes: {
    priority: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'tertiary']
    >;
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
    hierarchy: Schema.Attribute.Component<'element.hierarchy', false>;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
    leadin: Schema.Attribute.String;
    links: Schema.Attribute.Component<'element.link', true>;
    price: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    text_align: Schema.Attribute.Enumeration<['center', 'left', 'right']> &
      Schema.Attribute.DefaultTo<'center'>;
    title: Schema.Attribute.String;
    width: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 12;
        },
        number
      > &
      Schema.Attribute.DefaultTo<12>;
  };
}

export interface ElementSchedule extends Struct.ComponentSchema {
  collectionName: 'components_element_schedules';
  info: {
    displayName: 'schedule';
    icon: 'calendar';
  };
  attributes: {
    date_end: Schema.Attribute.DateTime;
    date_start: Schema.Attribute.DateTime;
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
    description: '';
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
      'content.contact-form': ContentContactForm;
      'content.form-dynamic-zone': ContentFormDynamicZone;
      'content.freeform-text': ContentFreeformText;
      'content.gallery': ContentGallery;
      'content.hero': ContentHero;
      'content.section-header': ContentSectionHeader;
      'element.alignment': ElementAlignment;
      'element.button': ElementButton;
      'element.hierarchy': ElementHierarchy;
      'element.image': ElementImage;
      'element.link': ElementLink;
      'element.lockup': ElementLockup;
      'element.schedule': ElementSchedule;
      'global.footer': GlobalFooter;
      'global.header': GlobalHeader;
      'seo.seo': SeoSeo;
    }
  }
}
