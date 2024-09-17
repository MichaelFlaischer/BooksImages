import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, showfunc, closeUpdateFunc }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <BookPreview key={book.id} book={book} showfunc={showfunc} closeUpdateFunc={closeUpdateFunc} />
      ))}
    </ul>
  )
}
