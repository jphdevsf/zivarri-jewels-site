const dZLockup = {
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

const dZSchedule = {
  populate: '*'
}

export const dynamicZoneQuery = {
  'content.card-list': {
    fields: ['title', 'carousel_desktop', 'carousel_mobile'],
    populate: {
      cards: {
        populate: {
          lockup: dZLockup,
          schedule: dZSchedule,
          image: dZImage
        }
      }
    }
  },
  'content.card': {
    populate: {
      lockup: dZLockup,
      schedule: dZSchedule,
      image: dZImage
    }
  },
  'content.section-header': {
    populate: {
      lockup: dZLockup,
      schedule: dZSchedule
    }
  },
  'content.gallery': {
    fields: ['title'],
    populate: {
      images: {
        fields: ['url', 'width', 'height', 'alternativeText']
      },
      schedule: dZSchedule
    }
  },
  'content.freeform-text': {
    populate: '*'
  },
}