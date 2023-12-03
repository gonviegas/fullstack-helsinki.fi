import { useState, useEffect } from 'react'
import { GetBooksByGenre } from '../hooks'

const RecommendedBooks = props => {
  const [genre, setGenre] = useState(null)
  const books = GetBooksByGenre(genre)

  useEffect(() => {
    if (props.user) {
      setGenre(props.user.favoriteGenre)
    }
  }, [props.user])

  if (!props.show) {
    return null
  }

  console.log(books)
  return (
    <div>
      <h2>recommendations</h2>
      {props.user && <h3>{props.user.favoriteGenre}</h3>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data &&
            books.data.allBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks
