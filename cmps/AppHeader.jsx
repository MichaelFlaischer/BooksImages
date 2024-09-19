export function AppHeader({ onSetPage }) {
  const pages = [
    { name: 'home', label: 'Home' },
    { name: 'about', label: 'About' },
    { name: 'books', label: 'Book Index' },
  ]

  return (
    <header className='app-header full main-layout'>
      <section>
        <h1>React Book App</h1>
        <nav className='app-nav'>
          {pages.map((page) => (
            <a key={page.name} onClick={() => onSetPage(page.name)} href='#'>
              {page.label}
            </a>
          ))}
        </nav>
      </section>
    </header>
  )
}
