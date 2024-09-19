import { bookService } from './services/book.service.js'
import { BookFilter } from './BookFilter.jsx'
import { BookList } from './BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookEdit } from './BookEdit.jsx'

export function BookIndex() {
  const { useEffect, useState } = React
  const [booksList, setBooksList] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(null)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  const [showBook, setShowBook] = useState(null)
  const [editBook, setEditBook] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => {
        setBooksList(books)
        setFilteredBooks(books)
      })
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

  function updateBooksToShow(books) {
    setFilteredBooks(books)
  }

  function editBookDetails(book) {
    setEditBook(book)
  }

  function closeEditBook(books) {
    setEditBook(null)
    setBooksList(books)
    setFilteredBooks(books)
  }

  function addNewBook() {
    setEditBook(bookService.getEmptyBook())
  }

  function deleteBook(bookId) {
    bookService
      .remove(bookId)
      .then(() => {
        const updatedBooks = booksList.filter((book) => book.id !== bookId)
        setBooksList(updatedBooks)
        setFilteredBooks(updatedBooks)
      })
      .catch((err) => {
        console.log('Error deleting book:', err)
      })
  }

  function onSetFilter(newFilter) {
    bookService.setFilterBy(newFilter)
    setFilterBy(newFilter)
  }

  if (!booksList) return <div>Loading...</div>

  return (
    <section>
      {editBook ? (
        <React.Fragment>
          <h2>{editBook.id ? 'Edit Book' : 'Add Book'}</h2>
          <BookEdit bookId={editBook.id} closeUpdateFunc={closeEditBook} />
        </React.Fragment>
      ) : showBook ? (
        <React.Fragment>
          <h2>{showBook.title}</h2>
          <BookDetails book={showBook} closeFunc={closeShowBookDetails} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>BookIndex</h2>
          <button onClick={addNewBook}>Add New Book</button>
          <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
          <BookList books={filteredBooks} showfunc={showBookDetails} closeUpdateFunc={editBookDetails} onDelete={deleteBook} />
        </React.Fragment>
      )}
    </section>
  )
}
