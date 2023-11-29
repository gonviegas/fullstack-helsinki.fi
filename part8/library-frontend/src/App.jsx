import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

function App() {
  const [page, setPage] = useState('authors')
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  if (allAuthors.loading || allBooks.loading) {
    return <div>loading...</div>
  }

  console.log('allAuthors', allAuthors)
  console.log('allBooks', allBooks)
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={allAuthors.data.allAuthors} />

      <Books show={page === 'books'} books={allBooks.data.allBooks} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
