const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from '../services/book.service.js'
import { eventBusService } from '../services/event-bus.service.js'

export function AddReview() {
  const { bookId } = useParams()
  const navigate = useNavigate()

  const [review, setReview] = useState({
    fullname: '',
    rating: 1,
    readAt: '',
  })
  const [bookTitle, setBookTitle] = useState('')
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const [selectedRating, setSelectedRating] = useState(review.rating)

  useEffect(() => {
    bookService
      .get(bookId)
      .then((book) => {
        if (!book) {
          navigate('/books/SearchError')
        } else {
          setBookTitle(book.title)
        }
      })
      .catch((err) => {
        console.error('Error loading book:', err)
        navigate('/books/SearchError')
      })
  }, [bookId])

  useEffect(() => {
    checkIfCanSave()
  }, [review])

  function checkIfCanSave() {
    const { fullname, rating, readAt } = review
    const canSave = fullname.trim() && rating && readAt.trim()
    setIsSaveDisabled(!canSave)
  }

  function handleChange({ target }) {
    const { name, value } = target
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }))
  }

  function handleStarClick(rating) {
    setSelectedRating(rating)
    setReview((prevReview) => ({
      ...prevReview,
      rating,
    }))
  }

  function handleGoBack() {
    navigate(-1)
  }

  function onSubmit(ev) {
    ev.preventDefault()
    if (isSaveDisabled) return

    bookService
      .addReview(bookId, review)
      .then(() => {
        eventBusService.emit('show-user-msg', { txt: 'Review added successfully!', type: 'success' })
        setReview({ fullname: '', rating: 1, readAt: '' })
        navigate(-1)
      })
      .catch((err) => {
        eventBusService.emit('show-user-msg', { txt: 'Failed to add review', type: 'error' })
        navigate(-1)
      })
  }

  return (
    <section className='add-review'>
      <h3>Add Review for "{bookTitle}"</h3>
      <form onSubmit={onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor='fullname'>Fullname:</label>
              </td>
              <td>
                <input type='text' id='fullname' name='fullname' value={review.fullname} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label>Rating:</label>
              </td>
              <td>
                <div className='star-rating'>
                  {[5, 4, 3, 2, 1].map((num) => (
                    <React.Fragment key={num}>
                      <input type='radio' id={`star${num}`} name='rating' value={num} checked={selectedRating === num} onChange={() => handleStarClick(num)} />
                      <label htmlFor={`star${num}`} title={`${num} stars`}>
                        ★
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor='readAt'>Read At:</label>
              </td>
              <td>
                <input type='date' id='readAt' name='readAt' value={review.readAt} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button disabled={isSaveDisabled}>Add Review</button>
                <button onClick={handleGoBack}>Go Back</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </section>
  )
}
