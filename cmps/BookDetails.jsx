const { useState } = React

import { LongTxt } from './LongTxt.jsx'

export function BookDetails({ book, closeFunc }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const defaultImageUrl = 'https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/image-not-found-icon.png'
  const bookImageUrl = book.thumbnail || defaultImageUrl

  const getPageCountText = () => {
    if (book.pageCount > 500) return 'Serious Reading'
    if (book.pageCount > 200) return 'Descent Reading'
    if (book.pageCount < 100) return 'Light Reading'
    return ''
  }

  const getPublishedDateText = () => {
    const currentYear = new Date().getFullYear()
    if (currentYear - book.publishedDate > 10) return 'Vintage'
    if (currentYear - book.publishedDate < 1) return 'New'
    return ''
  }

  const getPriceClass = () => {
    if (book.listPrice.amount > 150) return 'price-high'
    if (book.listPrice.amount < 20) return 'price-low'
    return ''
  }

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <div className='book-details'>
      {!isImageLoaded && <div className='loader'></div>}
      <img src={bookImageUrl} alt={book.title} onLoad={handleImageLoad} onError={(e) => (e.target.src = defaultImageUrl)} />
      <table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <td>Authors:</td>
            <td>{book.authors.join(', ')}</td>
          </tr>
          <tr>
            <td>Published Date:</td>
            <td>
              {book.publishedDate} ({getPublishedDateText()})
            </td>
          </tr>
          <tr>
            <td>Page Count:</td>
            <td>
              {book.pageCount} ({getPageCountText()})
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>
              <LongTxt txt={book.description}></LongTxt>
            </td>
          </tr>
          <tr>
            <td>Categories:</td>
            <td>{book.categories.join(', ')}</td>
          </tr>
          <tr>
            <td>Language:</td>
            <td>{book.language}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td className={getPriceClass()}>
              {book.listPrice.amount} {book.listPrice.currencyCode}
              {book.listPrice.isOnSale && <span className='on-sale'> On Sale!</span>}
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={closeFunc}>Close</button>
    </div>
  )
}
