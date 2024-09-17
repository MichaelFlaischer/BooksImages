import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, showfunc }) {
  return (
    <ul>
      {books.map((book) => (
        <BookPreview key={book.id} book={book} showfunc={showfunc}></BookPreview>
      ))}
    </ul>
  )
}
