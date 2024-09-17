export function BookFilter() {
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
                <input type='text' id='title' name='title' placeholder='Enter book title' />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='author'>Author:</label>
              </td>
              <td>
                <input type='text' id='author' name='author' placeholder='Enter author name' />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='minPrice'>Min Price:</label>
              </td>
              <td>
                <input type='number' id='minPrice' name='minPrice' placeholder='Min price' />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='maxPrice'>Max Price:</label>
              </td>
              <td>
                <input type='number' id='maxPrice' name='maxPrice' placeholder='Max price' />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='publishedDate'>Published After:</label>
              </td>
              <td>
                <input type='number' id='publishedDate' name='publishedDate' placeholder='Enter year' />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='category'>Category:</label>
              </td>
              <td>
                <select id='category' name='category'>
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
                <select id='language' name='language'>
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
                <button type='submit'>Filter Books</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </section>
  )
}
