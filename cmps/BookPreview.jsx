export function BookPreview({ book, showfunc, closeUpdateFunc }) {
  return (
    <li className='book-preview'>
      <h3>{book.title}</h3>
      <p>by {book.authors.join(', ')}</p>
      <p>
        Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <button onClick={() => showfunc(book)}>Show Details</button>
      <button onClick={() => closeUpdateFunc(book)}>Edit</button>
    </li>
  )
}
