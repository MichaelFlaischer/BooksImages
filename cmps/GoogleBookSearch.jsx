const { useState, useEffect, useRef } = React
import { googleBookService } from '../services/googleBookService.js'
import { GoogleBookCard } from './GoogleBookCard.jsx'

export function GoogleBookSearch({ onBookSelect }) {
  const [googleSearchTerm, setGoogleSearchTerm] = useState('')
  const [googleBooks, setGoogleBooks] = useState([])
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const detailsRef = useRef(null)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(googleSearchTerm)
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [googleSearchTerm])

  useEffect(() => {
    if (debouncedTerm) {
      handleGoogleSearch(debouncedTerm)
    }
  }, [debouncedTerm])

  async function handleGoogleSearch(term) {
    const books = await googleBookService.queryGoogleBooks(term)
    setGoogleBooks(books)
  }

  function handleBookSelect(book) {
    onBookSelect(book)
    if (detailsRef.current) {
      detailsRef.current.open = false
    }
  }

  if (!googleBooks)
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )

  return (
    <details className='book-filter' ref={detailsRef} open>
      <summary className='book-filter-summary'>Google Books Search</summary>

      <div className='google-book-search'>
        <input type='text' placeholder='Search Google Books' value={googleSearchTerm} onChange={(e) => setGoogleSearchTerm(e.target.value)} />
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
