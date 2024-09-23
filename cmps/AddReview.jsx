import { bookService } from '../services/book.service.js'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function AddReview({ onAddReview }) {
  const { bookId } = useParams()
  const navigate = useNavigate()

  const [review, setReview] = useState({
    fullname: '',
    rating: 1,
    readAt: '',
  })

  function handleChange({ target }) {
    const { name, value } = target
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    bookService.addReview(bookId, review).then(() => {
      onAddReview(review)
      setReview({ fullname: '', rating: 1, readAt: '' })
      navigate(-1)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Full name:
        <input type='text' name='fullname' value={review.fullname} onChange={handleChange} required />
      </label>

      <label>
        Rating:
        <select name='rating' value={review.rating} onChange={handleChange} required>
          <option value='1'>1 Star</option>
          <option value='2'>2 Stars</option>
          <option value='3'>3 Stars</option>
          <option value='4'>4 Stars</option>
          <option value='5'>5 Stars</option>
        </select>
      </label>

      <label>
        Read at:
        <input type='date' name='readAt' value={review.readAt} onChange={handleChange} required />
      </label>

      <button type='submit'>Add Review</button>
    </form>
  )
}
