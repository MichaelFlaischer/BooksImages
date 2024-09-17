import { bookService } from './services/book.service.js'
import { BookFilter } from './BookFilter.jsx'
import { BookList } from './BookList.jsx'
import { BookDetails } from './BookDetails.jsx'
import { BookEdit } from './BookEdit.jsx'

export function BookIndex() {
  const { useEffect, useState } = React
  const [booksList, setBooksList] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState(null)
  const [showBook, setShowBook] = useState(null)
  const [editBook, setEditBook] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookService
      .query()
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
          <BookFilter books={booksList} setFilteredBooks={updateBooksToShow} />
          <BookList books={filteredBooks} showfunc={showBookDetails} closeUpdateFunc={editBookDetails} />
        </React.Fragment>
      )}
    </section>
  )
}
