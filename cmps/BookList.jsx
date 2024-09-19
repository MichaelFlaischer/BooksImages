import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, showfunc, closeUpdateFunc, onDelete, addBookFunc }) {
  return (
    <ul className='book-list'>
      <BookPreview addBookFunc={addBookFunc} />
      {books.map((book) => (
        <BookPreview key={book.id} book={book} showfunc={showfunc} closeUpdateFunc={closeUpdateFunc} onDelete={onDelete} />
      ))}
    </ul>
  )
}
