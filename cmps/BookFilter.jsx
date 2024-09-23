const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'

export function BookFilter({ onSetFilter }) {
  const [filterValues, setFilterValues] = useState(bookService.getFilterBy())

  useEffect(() => {
    onSetFilter(filterValues)
  }, [filterValues, onSetFilter])

  function handleChange({ target }) {
    const { name, value } = target
    let updatedValue = value

    if (name === 'maxPrice' && value === '') {
      updatedValue = Infinity
    }

    const updatedFilter = { ...filterValues, [name]: updatedValue }
    setFilterValues(updatedFilter)
    bookService.setFilterBy(updatedFilter)
  }

  function resetFilter() {
    const defaultFilter = bookService.getDefaultFilter()
    setFilterValues(defaultFilter)
    bookService.setFilterBy(defaultFilter)
    onSetFilter(defaultFilter)
  }

  return (
    <details className='book-filter'>
      <summary className='book-filter-summary'>Filter Books</summary>
      <form>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='title'>Title:</label>
              </td>
              <td>
                <input type='text' id='title' name='title' value={filterValues.title} onChange={handleChange} placeholder='Enter book title' />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='author'>Author:</label>
              </td>
              <td>
                <input type='text' id='author' name='author' value={filterValues.author} onChange={handleChange} placeholder='Enter author name' />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='minPrice'>Min Price:</label>
              </td>
              <td>
                <input type='number' id='minPrice' name='minPrice' value={filterValues.minPrice} onChange={handleChange} placeholder='Min price' />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='maxPrice'>Max Price:</label>
              </td>
              <td>
                <input
                  type='number'
                  id='maxPrice'
                  name='maxPrice'
                  value={filterValues.maxPrice === Infinity ? '' : filterValues.maxPrice}
                  onChange={handleChange}
                  placeholder='Max price'
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='publishedDate'>Published After:</label>
              </td>
              <td>
                <input
                  type='number'
                  id='publishedDate'
                  name='publishedDate'
                  value={filterValues.publishedDate}
                  onChange={handleChange}
                  placeholder='Enter year'
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='category'>Category:</label>
              </td>
              <td>
                <select id='category' name='category' value={filterValues.category} onChange={handleChange}>
                  <option value=''>Select Category</option>
                  <option value='Fiction'>Fiction</option>
                  <option value='Adventure'>Adventure</option>
                  <option value='Classic'>Classic</option>
                  <option value='Fantasy'>Fantasy</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='language'>Language:</label>
              </td>
              <td>
                <select id='language' name='language' value={filterValues.language} onChange={handleChange}>
                  <option value=''>Select Language</option>
                  <option value='en'>English</option>
                  <option value='es'>Spanish</option>
                  <option value='fr'>French</option>
                  <option value='de'>German</option>
                  <option value='it'>Italian</option>
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan='2'>
                <button type='button' onClick={resetFilter}>
                  Reset Filter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </details>
  )
}
