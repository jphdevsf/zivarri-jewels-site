import type { CardListBanner } from '@/types/content'
import Card from './Card'

const CardList = ({ title, carousel_desktop, carousel_mobile, cards }: CardListBanner) => {
  return (
    <div className='content-card-list'>
      {/* <p>Carousel Desktop: {carousel_desktop ? 'Yes' : 'No'}</p>
      <p>Carousel Mobile: {carousel_mobile ? 'Yes' : 'No'}</p> */}
      <h2 className='text-3xl'>{title}</h2>
      <div className="block md:flex flex-row gap-4 mt-8">
        {cards.map((card) => {
          const { id: cardId } = card
          return (
            <div key={cardId}>
              <Card {...card} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CardList
