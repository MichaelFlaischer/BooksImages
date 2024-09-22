export function AppHeader({ onSetPage }) {
  const pages = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Book Index', page: 'books' },
  ]

  return (
    <header className='app-header full main-layout'>
      <section>
        <h1>React Book App</h1>
        <nav className='app-nav'>
          {pages.map((page) => (
            <a key={page.page} onClick={() => onSetPage(page.page)} href='#'>
              {page.name}
            </a>
          ))}
        </nav>
      </section>
    </header>
  )
}
