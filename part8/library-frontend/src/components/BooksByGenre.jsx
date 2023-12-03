import { GetBooksByGenre } from '../hooks'

const BooksByGenre = props => {
  const books = GetBooksByGenre(props.genre)

  return (
    <>
      {books.data &&
        books.data.allBooks.map(a => (
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        ))}
    </>
  )
}

export default BooksByGenre
