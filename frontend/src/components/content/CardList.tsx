import type { CardListBanner } from '@/types/content'
import Card from './Card'

const CardList = ({ title, carousel_desktop, carousel_mobile, cards }: CardListBanner) => {
  return (
    <div>
      <p>{title}</p>
      <p>Carousel Desktop: {carousel_desktop ? 'Yes' : 'No'}</p>
      <p>Carousel Mobile: {carousel_mobile ? 'Yes' : 'No'}</p>
      {cards.map((card) => {
        const { id: cardId } = card
        return (
          <div key={cardId}>
            <Card __component='content.card' {...card} />
          </div>
        )
      })}
    </div>
  )
}

export default CardList
