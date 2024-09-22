import { BookPreview } from './BookPreview.jsx'
import { AddBookCard } from './AddBookCard.jsx'

export function BookList({ books, showfunc, closeUpdateFunc, onDelete, addBookFunc }) {
  return (
    <ul className='book-list'>
      <AddBookCard addBookFunc={addBookFunc} />
      {books.map((book) => (
        <BookPreview key={book.id} book={book} showfunc={showfunc} closeUpdateFunc={closeUpdateFunc} onDelete={onDelete} />
      ))}
    </ul>
  )
}
