export function BookPreview({ book, showfunc }) {
  return (
    <li>
      {book.title} - {book.authors.join(', ')} - {book.publishedDate}
      <button onClick={() => showfunc(book)}>Show Details</button>
    </li>
  )
}
