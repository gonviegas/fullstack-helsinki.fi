import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

export const GetBooksByGenre = genre => {
  const books = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre
  })

  if (!genre) {
    return null
  }

  return books
}
