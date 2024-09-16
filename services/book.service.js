import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minPrice: 0 }
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getNextBookId,
  getFilterBy,
  setFilterBy,
  addBooks,
}

function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.txt) {
      const regex = new RegExp(gFilterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (gFilterBy.minPrice) {
      books = books.filter((book) => book.listPrice.amount >= gFilterBy.minPrice)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

// Add books function to add multiple books
function addBooks(books) {
  return Promise.all(books.map((book) => storageService.post(BOOK_KEY, book)))
    .then((results) => {
      console.log('All books have been added:', results)
      return results
    })
    .catch((err) => {
      console.error('Error adding books:', err)
      throw err
    })
}

function getEmptyBook(
  title = '',
  subtitle = '',
  authors = [],
  publishedDate = 2000,
  description = '',
  pageCount = 100,
  categories = [],
  thumbnail = '',
  language = 'en',
  listPrice = { amount: 0, currencyCode: 'USD', isOnSale: false }
) {
  return { id: '', title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice }
}

function getFilterBy() {
  return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
  return gFilterBy
}

function getNextBookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    let nextBookIdx = books.findIndex((book) => book.id === bookId) + 1
    if (nextBookIdx === books.length) nextBookIdx = 0
    return books[nextBookIdx].id
  })
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    books = []
    books.push(
      _createBook(
        'Metus Hendrerit',
        'mi est eros dapibus himenaeos',
        ['Barbara Cartland'],
        1999,
        'placerat nisi sodales suscipit tellus',
        713,
        ['Computers', 'Hack'],
        'http://ca.org/books-photos/20.jpg',
        'en',
        { amount: 109, currencyCode: 'EUR', isOnSale: false }
      )
    )
    books.push(
      _createBook(
        'Lorem Ipsum',
        'some subtitle',
        ['John Doe'],
        2005,
        'lorem ipsum dolor sit amet',
        500,
        ['Fiction', 'Adventure'],
        'http://ca.org/books-photos/21.jpg',
        'en',
        { amount: 45, currencyCode: 'USD', isOnSale: true }
      )
    )
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice) {
  const book = getEmptyBook(title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice)
  book.id = utilService.makeId()
  return book
}
