import type { GalleryBanner } from '@/types/content'

const Gallery = ({ title, images }: GalleryBanner) => {
  return (
    <div>
      {/* {schedule && (
        <div>
          <h4>Schedule</h4>
          <p>Start: {schedule.date_start}</p>
          <p>End: {schedule.date_end}</p>
        </div>
      )} */}
      <p>Title: {title}</p>
      <div>
        <h4>Images</h4>
        {images.map((image) => (
          <div key={image.id}>
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
