const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'

export function BookIndex() {
  const [booksList, setBooksList] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => {
        setBooksList(books)
      })
      .catch((err) => {
        console.log('Problem getting books', err)
      })
  }

  function onSetFilter(newFilter) {
    setFilterBy(newFilter)
  }

  function deleteBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        loadBooks()
      })
      .catch((err) => {
        console.log('Error deleting book:', err)
      })
  }

  if (!booksList) {
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
    <section>
      <React.Fragment>
        <h2>BookIndex</h2>
        <BookFilter onSetFilter={onSetFilter} />
        <BookList books={booksList} onDelete={deleteBook} />
      </React.Fragment>
    </section>
  )
}
