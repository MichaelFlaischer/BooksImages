const { useState, useRef } = React
import { googleBookService } from '../services/googleBookService.js'
import { GoogleBookCard } from './GoogleBookCard.jsx'

export function GoogleBookSearch({ onBookSelect }) {
  const [googleSearchTerm, setGoogleSearchTerm] = useState('')
  const [googleBooks, setGoogleBooks] = useState([])
  const detailsRef = useRef(null)

  async function handleGoogleSearch() {
    const books = await googleBookService.queryGoogleBooks(googleSearchTerm)
    setGoogleBooks(books)
  }

  function handleBookSelect(book) {
    onBookSelect(book)
    if (detailsRef.current) {
      detailsRef.current.open = false
    }
  }

  return (
    <details className='book-filter' open ref={detailsRef}>
      <summary className='book-filter-summary'>Google Books Search</summary>

      <div className='google-book-search'>
        <input type='text' placeholder='Search Google Books' value={googleSearchTerm} onChange={(e) => setGoogleSearchTerm(e.target.value)} />
        <button onClick={handleGoogleSearch}>Search</button>

        {googleBooks.length > 0 && (
          <div className='google-book-list'>
            {googleBooks.map((googleBook) => (
              <GoogleBookCard key={googleBook.googleId} book={googleBook} onBookSelect={handleBookSelect} />
            ))}
          </div>
        )}
      </div>
    </details>
  )
}
