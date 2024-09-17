import { bookService } from './services/book.service.js'

export function BookEdit({ bookId, closeUpdateFunc }) {
  const { useEffect, useState } = React

  const [book, setBook] = useState(bookService.getEmptyBook())

  useEffect(() => {
    if (bookId) {
      loadBook()
    }
  }, [bookId])

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

  function handleSave() {
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
        <label>
          Title:
          <input type='text' name='title' value={book.title} onChange={handleChange} />
        </label>
        <label>
          Subtitle:
          <input type='text' name='subtitle' value={book.subtitle} onChange={handleChange} />
        </label>
        <label>
          Authors:
          <input
            type='text'
            name='authors'
            value={book.authors.join(', ')}
            onChange={(ev) => handleChange({ target: { name: 'authors', value: ev.target.value.split(', ') } })}
          />
        </label>
        <label>
          Published Date:
          <input type='number' name='publishedDate' value={book.publishedDate} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name='description' value={book.description} onChange={handleChange} />
        </label>
        <label>
          Page Count:
          <input type='number' name='pageCount' value={book.pageCount} onChange={handleChange} />
        </label>
        <label>
          Categories:
          <input
            type='text'
            name='categories'
            value={book.categories.join(', ')}
            onChange={(ev) => handleChange({ target: { name: 'categories', value: ev.target.value.split(', ') } })}
          />
        </label>
        <label>
          Thumbnail:
          <input type='text' name='thumbnail' value={book.thumbnail} onChange={handleChange} />
        </label>
        <label>
          Language:
          <input type='text' name='language' value={book.language} onChange={handleChange} />
        </label>
        <label>
          List Price:
          <input
            type='number'
            name='amount'
            value={book.listPrice.amount}
            onChange={(ev) => handleChange({ target: { name: 'listPrice', value: { ...book.listPrice, amount: +ev.target.value } } })}
          />
          <select
            name='currencyCode'
            value={book.listPrice.currencyCode}
            onChange={(ev) => handleChange({ target: { name: 'listPrice', value: { ...book.listPrice, currencyCode: ev.target.value } } })}
          >
            <option value='USD'>USD</option>
            <option value='EUR'>EUR</option>
            <option value='ILS'>ILS</option>
          </select>
          <label>
            On Sale:
            <input
              type='checkbox'
              checked={book.listPrice.isOnSale}
              onChange={(ev) => handleChange({ target: { name: 'listPrice', value: { ...book.listPrice, isOnSale: ev.target.checked } } })}
            />
          </label>
        </label>
        <div className='action-buttons'>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </section>
  )
}
