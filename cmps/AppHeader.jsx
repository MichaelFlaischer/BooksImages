export function AppHeader({ onSetPage }) {
  return (
    <header className='app-header full main-layout'>
      <section>
        <h1>React Book App</h1>
        <nav className='app-nav'>
          <a onClick={() => onSetPage('home')} href='#'>
            Home
          </a>
          <a onClick={() => onSetPage('about')} href='#'>
            About
          </a>
          <a onClick={() => onSetPage('books')} href='#'>
            Book Index
          </a>
        </nav>
      </section>
    </header>
  )
}
