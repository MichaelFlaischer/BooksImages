export function BookPreview({ book = null, showfunc = null, closeUpdateFunc = null, onDelete = null, addBookFunc = null }) {
  if (addBookFunc)
    return (
      <li className='book-preview book-item'>
        <h3>Add New Book</h3>
        <button onClick={() => addBookFunc()}>Add new book</button>
      </li>
    )

  return (
    <li className='book-preview book-item'>
      <h3>{book.title}</h3>
      <p>by {book.authors.join(', ')}</p>
      <p>
        Price: {book.listPrice.amount} {book.listPrice.currencyCode}
      </p>
      <button onClick={() => showfunc(book)}>Show Details</button>
      <button onClick={() => closeUpdateFunc(book)}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </li>
  )
}
