const dZLockup = {
  fields: ['text_align', 'leadin', 'title', 'subtitle', 'price', 'width'],
  populate: {
    links: {
      fields: ['title', 'url'],
      populate: '*'
    }
  }
}

const dZLockupAlign = {
  populate: '*'
}

const dZImage = {
  populate: {
    desktop: {
      fields: ['url', 'width', 'height']
    },
    mobile: {
      fields: ['url', 'width', 'height']
    }
  }
}

export const dynamicZoneQuery = {
  'content.card-list': {
    fields: ['title', 'carousel_desktop', 'carousel_mobile'],
    populate: {
      cards: {
        populate: {
          lockup: dZLockup,
          image: dZImage,
        }
      }
    }
  },
  'content.card': {
    populate: {
      lockup: dZLockup,
      image: dZImage,
    }
  },
  'content.hero': {
    populate: {
      lockup: dZLockup,
      image: dZImage,
      lockup_align: dZLockupAlign
    }
  },
  'content.section-header': {
    populate: {
      lockup: dZLockup,
    }
  },
  'content.gallery': {
    fields: ['title'],
    populate: {
      images: {
        fields: ['url', 'width', 'height', 'alternativeText', 'formats'],
      },
    }
  },
  'content.freeform-text': {
    populate: '*'
  },
  'content.contact-form': {
    fields: ['title']
  }
}