import { AppHeader } from './cmps/AppHeader.jsx'
import { Home } from './pages/Home.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

export function App() {
  const { useState } = React

  const [page, setPage] = useState('home')

  const pages = [
    { name: 'home', component: <Home /> },
    { name: 'about', component: <AboutUs /> },
    { name: 'books', component: <BookIndex /> },
  ]

  function onSetPage(page) {
    setPage(page)
  }

  return (
    <section className='app'>
      <AppHeader onSetPage={onSetPage} />
      <main className='container'>
        {pages.map(({ name, component }) => {
          if (page === name) return component
          return null
        })}
      </main>
    </section>
  )
}
