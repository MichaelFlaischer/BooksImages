import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, showfunc, closeUpdateFunc, onDelete }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <BookPreview key={book.id} book={book} showfunc={showfunc} closeUpdateFunc={closeUpdateFunc} onDelete={onDelete} />
      ))}
    </ul>
  )
}
