const { useState } = React

export function BookPreview({ book, showfunc, closeUpdateFunc, onDelete }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const defaultImageUrl = 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/image-not-found-icon.png'
  const bookImageUrl = book ? book.thumbnail : defaultImageUrl

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <li className='book-preview book-item'>
      {!isImageLoaded && <div className='loader'></div>}
      <img src={bookImageUrl} alt={book.title} onLoad={handleImageLoad} onError={(e) => (e.target.src = defaultImageUrl)} />
      <h3>{book.title}</h3>
      <p>by {book.authors.join(', ')}</p>
      <p>
        Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <button onClick={() => showfunc(book)}>Show Details</button>
      <button onClick={() => closeUpdateFunc(book)}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </li>
  )
}
