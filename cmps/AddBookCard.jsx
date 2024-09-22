export function AddBookCard({ addBookFunc }) {
  return (
    <li className='book-preview book-item'>
      <h3>Add New Book</h3>
      <button onClick={() => addBookFunc()}>Add new book</button>
    </li>
  )
}
