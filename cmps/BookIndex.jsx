import { bookService } from './services/book.service.js'
import { BookFilter } from './BookFilter.jsx'
import { BookList } from './BookList.jsx'
import { BookDetails } from './BookDetails.jsx'

export function BookIndex() {
  const { useEffect, useState } = React
  const [books, setBooks] = useState(null)
  const [showBook, setShowBook] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  useEffect(() => {
    if (showBook !== null) {
      console.log('Show Details')
      console.log(showBook)
    }
  }, [showBook])

  function loadBooks() {
    bookService
      .query()
      .then(setBooks)
      .catch((err) => {
        console.log('Problem getting books', err)
      })
  }

  function showBookDetails(book) {
    setShowBook(book)
  }

  function closeShowBookDetails() {
    setShowBook(null)
  }

  if (!books) return <div>Loading...</div>

  return (
    <section>
      <h2>BookIndex</h2>
      {showBook ? (
        <BookDetails book={showBook} closeFunc={closeShowBookDetails} />
      ) : (
        <React.Fragment>
          {' '}
          <BookFilter />
          <BookList books={books} showfunc={showBookDetails} />
        </React.Fragment>
      )}
    </section>
  )
}
