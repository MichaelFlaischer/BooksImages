export function BookDetails({ book, closeFunc }) {
  const getPageCountText = () => {
    if (book.pageCount > 500) return 'Serious Reading'
    if (book.pageCount > 200) return 'Descent Reading'
    if (book.pageCount < 100) return 'Light Reading'
    return ''
  }

  const getPublishedDateText = () => {
    const currentYear = new Date().getFullYear()
    if (currentYear - book.publishedDate > 10) return 'Vintage'
    if (currentYear - book.publishedDate < 1) return 'New'
    return ''
  }

  const getPriceClass = () => {
    if (book.listPrice.amount > 150) return 'price-high'
    if (book.listPrice.amount < 20) return 'price-low'
    return ''
  }

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
            <td>
              {book.publishedDate} ({getPublishedDateText()})
            </td>
          </tr>
          <tr>
            <td>Page Count:</td>
            <td>
              {book.pageCount} ({getPageCountText()})
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{book.description}</td>
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
            <td className={getPriceClass()}>
              {book.listPrice.amount} {book.listPrice.currencyCode}
              {book.listPrice.isOnSale && <span className='on-sale'> On Sale!</span>}
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={closeFunc}>Close</button>
    </div>
  )
}
