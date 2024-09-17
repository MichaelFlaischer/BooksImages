export function BookDetails({ book, closeFunc }) {
  return (
    <div className='book-details'>
      <table>
        <tbody>
          <tr>
            <td>Title:</td>
            <td>{book.title}</td>
          </tr>
          <tr>
            <td>Authors:</td>
            <td>{book.authors.join(', ')}</td>
          </tr>
          <tr>
            <td>Published Date:</td>
            <td>{book.publishedDate}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{book.description}</td>
          </tr>
          <tr>
            <td>Page Count:</td>
            <td>{book.pageCount}</td>
          </tr>
          <tr>
            <td>Categories:</td>
            <td>{book.categories.join(', ')}</td>
          </tr>
          <tr>
            <td>Language:</td>
            <td>{book.language}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>
              {book.listPrice.amount} {book.listPrice.currencyCode}
            </td>
          </tr>
          <tr>
            <td>On Sale:</td>
            <td>{book.listPrice.isOnSale ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={closeFunc}>Close</button>
    </div>
  )
}
