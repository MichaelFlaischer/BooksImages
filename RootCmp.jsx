import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './cmps/Home.jsx'
import { AboutUs } from './cmps/AboutUs.jsx'
import { BookIndex } from './cmps/BookIndex.jsx'

export function App() {
  const { useState } = React

  const [page, setPage] = useState('home')

  function onSetPage(page) {
    setPage(page)
  }

  return (
    <section className='app'>
      <AppHeader onSetPage={onSetPage} />
      <main className='container '>
        {page === 'home' && <Home />}
        {page === 'about' && <AboutUs />}
        {page === 'books' && <BookIndex />}
      </main>
    </section>
  )
}
