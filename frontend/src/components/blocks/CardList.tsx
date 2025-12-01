import type { CardListComponent } from '@/types/content'
import Card from './Card'

const CardList = ({ title, carousel_desktop, carousel_mobile, cards }: CardListComponent) => {
  return (
    <div className='content-card-list'>
      {/* <p>Carousel Desktop: {carousel_desktop ? 'Yes' : 'No'}</p>
      <p>Carousel Mobile: {carousel_mobile ? 'Yes' : 'No'}</p> */}
      {title && <h2 className='text-3xl mt-8 mb-6'>{title}</h2>}
      <div className="block md:flex flex-row gap-4">
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
