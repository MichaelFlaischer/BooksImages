import { bookService } from './services/book.service.js'

export function BookEdit({ bookId, closeUpdateFunc }) {
  const { useEffect, useState } = React

  const [book, setBook] = useState(bookService.getEmptyBook())
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)

  useEffect(() => {
    if (bookId) {
      loadBook()
    }
  }, [bookId])

  useEffect(() => {
    checkIfCanSave()
  }, [book])

  function loadBook() {
    bookService
      .get(bookId)
      .then(setBook)
      .catch((err) => {
        console.log('Error loading book:', err)
      })
  }

  function handleChange({ target }) {
    const { name, value } = target
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }))
  }

  function checkIfCanSave() {
    const requiredFields = [
      book.title,
      book.subtitle,
      book.authors.length > 0,
      book.publishedDate,
      book.description,
      book.pageCount,
      book.categories.length > 0,
      book.thumbnail,
      book.language,
      book.listPrice.amount,
    ]

    const allFieldsFilled = requiredFields.every((field) => Boolean(field))
    setIsSaveDisabled(!allFieldsFilled)
  }

  function handleSave() {
    if (isSaveDisabled) return
    bookService
      .save(book)
      .then(() => {
        bookService.query().then((books) => {
          closeUpdateFunc(books)
        })
      })
      .catch((err) => {
        console.log('Error saving book:', err)
      })
  }

  function handleCancel() {
    bookService.query().then((books) => {
      closeUpdateFunc(books)
    })
  }

  return (
    <section className='book-edit'>
      <h2>{bookId ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Title:</label>
              </td>
              <td>
                <input type='text' name='title' value={book.title} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Subtitle:</label>
              </td>
              <td>
                <input type='text' name='subtitle' value={book.subtitle} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Authors:</label>
              </td>
              <td>
                <input
                  type='text'
                  name='authors'
                  value={book.authors.join(', ')}
                  onChange={(ev) => handleChange({ target: { name: 'authors', value: ev.target.value.split(', ') } })}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Published Date:</label>
              </td>
              <td>
                <input type='number' name='publishedDate' value={book.publishedDate} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description:</label>
              </td>
              <td>
                <textarea name='description' value={book.description} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Page Count:</label>
              </td>
              <td>
                <input type='number' name='pageCount' value={book.pageCount} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Categories:</label>
              </td>
              <td>
                <input
                  type='text'
                  name='categories'
                  value={book.categories.join(', ')}
                  onChange={(ev) => handleChange({ target: { name: 'categories', value: ev.target.value.split(', ') } })}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Thumbnail:</label>
              </td>
              <td>
                <input type='text' name='thumbnail' value={book.thumbnail} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Language:</label>
              </td>
              <td>
                <input type='text' name='language' value={book.language} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label>List Price:</label>
              </td>
              <td>
                <input
                  type='number'
                  name='amount'
                  value={book.listPrice.amount}
                  onChange={(ev) =>
                    handleChange({
                      target: { name: 'listPrice', value: { ...book.listPrice, amount: +ev.target.value } },
                    })
                  }
                  required
                />
              </td>
              <td>
                <select
                  name='currencyCode'
                  value={book.listPrice.currencyCode}
                  onChange={(ev) =>
                    handleChange({
                      target: { name: 'listPrice', value: { ...book.listPrice, currencyCode: ev.target.value } },
                    })
                  }
                  required
                >
                  <option value='USD'>USD</option>
                  <option value='EUR'>EUR</option>
                  <option value='ILS'>ILS</option>
                </select>
              </td>
              <td>
                <label>
                  On Sale:
                  <input
                    type='checkbox'
                    checked={book.listPrice.isOnSale}
                    onChange={(ev) =>
                      handleChange({
                        target: { name: 'listPrice', value: { ...book.listPrice, isOnSale: ev.target.checked } },
                      })
                    }
                  />
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='action-buttons'>
          <button onClick={handleSave} disabled={isSaveDisabled}>
            Save
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </section>
  )
}
