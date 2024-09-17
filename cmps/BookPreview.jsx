export function BookPreview({ book, showfunc, closeUpdateFunc }) {
  return (
    <li className='book-item'>
      <h3 className='book-item-title'>{book.title}</h3>
      <p className='book-item-authors'>by {book.authors.join(', ')}</p>
      <p className='book-item-price'>
        Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <div className='book-item-actions'>
        <button onClick={() => showfunc(book)}>Show Details</button>
        <button onClick={() => closeUpdateFunc(book)}>Edit</button>
      </div>
    </li>
  )
}
