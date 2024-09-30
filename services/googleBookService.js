import { utilService } from './util.service.js'

export const googleBookService = {
  queryGoogleBooks,
  addGoogleBook,
}

async function queryGoogleBooks(searchTerm) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchTerm}`)
  const data = await res.json()

  if (!data.items) return []
  console.log(data.items)

  const books = data.items.map(_mapGoogleBook)

  return books
}

function addGoogleBook(googleBook) {
  const book = {
    googleId: googleBook.googleId,
    title: googleBook.title,
    subtitle: googleBook.subtitle || '',
    authors: googleBook.authors || [],
    publishedDate: googleBook.publishedDate || 'Unknown',
    description: googleBook.description || 'No description available',
    pageCount: googleBook.pageCount || 0,
    categories: googleBook.categories || ['Unknown'],
    thumbnail: googleBook.imageLinks ? googleBook.imageLinks.thumbnail : '',
    language: googleBook.language || 'en',
    listPrice: {
      amount: 0,
      currencyCode: 'USD',
      isOnSale: false,
    },
  }
  return book
}

function _mapGoogleBook(googleBook) {
  const volumeInfo = googleBook.volumeInfo

  return {
    googleId: googleBook.id,
    title: volumeInfo.title,
    subtitle: volumeInfo.subtitle || '',
    authors: volumeInfo.authors || [],
    publishedDate: volumeInfo.publishedDate ? utilService.parseDate(volumeInfo.publishedDate) : 'Unknown',
    description: volumeInfo.description || '',
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || ['Unknown'],
    thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : '',
    language: volumeInfo.language || 'en',
  }
}
