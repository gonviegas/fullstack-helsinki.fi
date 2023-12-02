import { useState, useEffect } from 'react'

const RecommendedBooks = props => {
  const [books, setBooks] = useState()

  useEffect(() => {
    if (props.user)
      setBooks(
        props.books.filter(book =>
          book.genres.includes(props.user.favoriteGenre)
        )
      )
  }, [props.user])

  if (!props.show) {
    return null
  }

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
          {books.map(a => (
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
