import { useState } from 'react'

const Books = props => {
  const [genre, setGenre] = useState()
  const [books, setBooks] = useState(props.books)

  if (!props.show) {
    return null
  }

  const genres = []
  for (let book of props.books) {
    for (let genre of book.genres) {
      if (!genres.includes(genre)) genres.push(genre)
    }
  }

  const filterBooks = genre => {
    if (!genre) {
      setGenre()
      setBooks(props.books)
    } else {
      setGenre(genre)
      setBooks(props.books.filter(book => book.genres.includes(genre)))
    }
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <h3>{genre}</h3>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(g => (
          <button
            onClick={() => filterBooks(g)}
            key={g}
            style={{
              marginRight: '5px',
              border: genre === g ? '2px solid #04AA6D' : ''
            }}
          >
            {g}
          </button>
        ))}
        <button
          onClick={() => filterBooks()}
          style={{ border: !genre ? '2px solid #04AA6D' : '' }}
        >
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
