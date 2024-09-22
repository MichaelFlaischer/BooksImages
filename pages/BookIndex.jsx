const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookEdit } from '../cmps/BookEdit.jsx'

export function BookIndex() {
  const [booksList, setBooksList] = useState(null)
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

  function editBookDetails(book) {
    setEditBook(book)
  }

  function closeEditBook() {
    setEditBook(null)
    loadBooks()
  }

  function addNewBook() {
    setEditBook(bookService.getEmptyBook())
  }

  function getBookData(bookId = null) {
    if (!bookId) return bookService.getEmptyBook()
    return bookService.get(bookId)
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

  function onSetFilter(newFilter) {
    bookService.setFilterBy(newFilter)
    setFilterBy(newFilter)
  }

  function getDefaultFilter() {
    return bookService.getDefaultFilter()
  }

  function saveFunc(updatedBook) {
    bookService
      .save(updatedBook)
      .then(() => {
        loadBooks()
        setEditBook(null)
      })
      .catch((err) => {
        console.log('Error saving book:', err)
      })
  }

  if (!booksList)
    return (
      <div className='loader-container'>
        <div className='loader'></div>
      </div>
    )

  return (
    <section>
      {editBook ? (
        <React.Fragment>
          <h2>{editBook.id ? 'Edit Book' : 'Add Book'}</h2>
          <BookEdit bookId={editBook.id} closeUpdateFunc={closeEditBook} saveFunc={saveFunc} getFunc={getBookData} />
        </React.Fragment>
      ) : showBook ? (
        <React.Fragment>
          <h2>{showBook.title}</h2>
          <BookDetails book={showBook} closeFunc={closeShowBookDetails} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>BookIndex</h2>
          <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} getDefaultFilter={getDefaultFilter} />
          <BookList books={booksList} addBookFunc={addNewBook} showfunc={showBookDetails} closeUpdateFunc={editBookDetails} onDelete={deleteBook} />
        </React.Fragment>
      )}
    </section>
  )
}
