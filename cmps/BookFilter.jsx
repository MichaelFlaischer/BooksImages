export function BookFilter({ books, setFilteredBooks }) {
  const { useEffect, useState } = React

  const [filterValues, setFilterValues] = useState({
    title: '',
    author: '',
    minPrice: '',
    maxPrice: '',
    publishedDate: '',
    category: '',
    language: '',
  })

  useEffect(() => {
    filterBooks()
  }, [filterValues])

  function handleChange({ target }) {
    const { name, value } = target
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  function filterBooks() {
    let filtered = books

    if (filterValues.title) {
      filtered = filtered.filter((book) => book.title.toLowerCase().includes(filterValues.title.toLowerCase()))
    }

    if (filterValues.author) {
      filtered = filtered.filter((book) => book.authors.some((author) => author.toLowerCase().includes(filterValues.author.toLowerCase())))
    }

    if (filterValues.minPrice) {
      filtered = filtered.filter((book) => book.listPrice.amount >= filterValues.minPrice)
    }

    if (filterValues.maxPrice) {
      filtered = filtered.filter((book) => book.listPrice.amount <= filterValues.maxPrice)
    }

    if (filterValues.publishedDate) {
      filtered = filtered.filter((book) => book.publishedDate >= parseInt(filterValues.publishedDate))
    }

    if (filterValues.category) {
      filtered = filtered.filter((book) => book.categories.includes(filterValues.category))
    }

    if (filterValues.language) {
      filtered = filtered.filter((book) => book.language === filterValues.language)
    }
    setFilteredBooks(filtered)
  }

  return (
    <section className='book-filter'>
      <h2>Filter Books</h2>
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
                <input type='number' id='maxPrice' name='maxPrice' value={filterValues.maxPrice} onChange={handleChange} placeholder='Max price' />
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
          </tbody>
        </table>
      </form>
    </section>
  )
}
