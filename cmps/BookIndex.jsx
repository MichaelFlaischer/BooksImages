import { bookService } from './services/book.service.js'

export function BookIndex() {
  const { useEffect, useState } = React
  const [books, setBooks] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService
      .query()
      .then(setBooks)
      .catch((err) => {
        console.log('Problem getting books', err)
      })
  }

  if (!books) return <div>Loading...</div>

  return (
    <section>
      <h2>BookIndex</h2>
      {books && (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} - {book.authors.join(', ')} - {book.publishedDate}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
