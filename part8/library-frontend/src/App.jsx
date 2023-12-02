import { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import RecommendedBooks from './components/RecommendedBooks'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

function App() {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  useEffect(() => {
    if (localStorage.getItem('user-token')) {
      setToken(localStorage.getItem('user-token'))
    }
  }, [])

  if (allAuthors.loading || allBooks.loading || user.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button
              onClick={() => {
                setPage('recommendedBooks')
              }}
            >
              recommended
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors
        show={page === 'authors'}
        authors={allAuthors.data.allAuthors}
        token={token}
      />

      <Books show={page === 'books'} books={allBooks.data.allBooks} />
      <RecommendedBooks
        show={page === 'recommendedBooks'}
        books={allBooks.data.allBooks}
        user={user.data.me}
      />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
