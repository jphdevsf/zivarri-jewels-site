import type { GalleryBanner } from '@/types/content'

const Gallery = ({ title, images }: GalleryBanner) => {
  return (
    <div className='content-gallery'>
      {/* {schedule && (
        <div>
          <h4>Schedule</h4>
          <p>Start: {schedule.date_start}</p>
          <p>End: {schedule.date_end}</p>
        </div>
      )} */}
      <p>Title: {title}</p>
      <div>
        {images.map((image) => (
          <div key={image.id} className=' p2 block dark:text-primary-dark bg-background dark:bg-background-dark'>
            <p>Image ID: {image.id}</p>
            <p>URL: {image.url}</p>
            <p>Width: {image.width}</p>
            <p>Height: {image.height}</p>
            <p>Alternative Text: {image.alternativeText || 'No alt text'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
