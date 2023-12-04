import { useState, useEffect } from 'react'
import BooksByGenre from './BooksByGenre'

const Books = props => {
  const [genreSelected, setGenreSelected] = useState()
  const [genres, setGenres] = useState()
  const [books, setBooks] = useState(props.books)

  useEffect(() => {
    if (props.books) {
      const newGenres = []
      for (let book of props.books) {
        for (let genre of book.genres) {
          if (!newGenres.includes(genre)) newGenres.push(genre)
        }
      }
      setGenres(newGenres)
      setBooks(props.books)
    }
  }, [props.books])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genreSelected && <h3>{genreSelected}</h3>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th style={{ textAlign: 'left' }}>author</th>
            <th style={{ textAlign: 'left' }}>published</th>
          </tr>
          {genreSelected ? (
            <BooksByGenre genre={genreSelected} />
          ) : (
            books.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button
            onClick={() => setGenreSelected(genre)}
            key={genre}
            style={{
              marginRight: '5px',
              border: genreSelected === genre ? '2px solid #04AA6D' : ''
            }}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={() => setGenreSelected()}
          style={{ border: !genreSelected ? '2px solid #04AA6D' : '' }}
        >
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
