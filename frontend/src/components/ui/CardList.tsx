import type { CardListBanner } from '@/types/content'
import Lockup from './atomic/Lockup'
import ImageData from './atomic/Image'

const CardList = ({ banner }: { banner: CardListBanner }) => {
  const { id, title, carousel_desktop, carousel_mobile, cards } = banner

  return (
    <div key={id}>
      <p>{title}</p>
      <p>Carousel Desktop: {carousel_desktop ? 'Yes' : 'No'}</p>
      <p>Carousel Mobile: {carousel_mobile ? 'Yes' : 'No'}</p>

      {cards.map((card) => {
        const { id: cardId, lockup, image } = card
        return (
          <div key={cardId}>
            <Lockup lockup={lockup} />
            <ImageData image={image} />
            {/* {schedule && (
                <div>
                  <h6>Schedule</h6>
                  <p>Start: {schedule.date_start}</p>
                  <p>End: {schedule.date_end}</p>
                </div>
              )} */}
          </div>
        )
      })}
    </div>
  )
}

export default CardList
