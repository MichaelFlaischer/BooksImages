const { Routes, Route, Navigate } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { BookDetails } from './cmps/BookDetails.jsx'
import { BookEdit } from './cmps/BookEdit.jsx'
import { ErrorPage } from './pages/ErrorPage.jsx'
import { SearchError } from './cmps/SearchError.jsx'
import { AddReview } from './cmps/AddReview.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <main className='container'>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/books' element={<BookIndex />} />
            <Route path='/books/:bookId' element={<BookDetails />} />
            <Route path='/books/:bookId/review' element={<AddReview />} />
            <Route path='/books/search-error' element={<SearchError />} />
            <Route path='/books/edit' element={<BookEdit />} />
            <Route path='/books/edit/:bookId' element={<BookEdit />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}
