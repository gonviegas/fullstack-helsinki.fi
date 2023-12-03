import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR, ME } from '../queries'
import Select from 'react-select'

const Authors = props => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, {query: ME}]
  })

  if (!props.show) {
    return null
  }
  const submit = async event => {
    event.preventDefault()

    editAuthor({ variables: { name: name.value, born } })

    setName(null)
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th style={{ textAlign: 'left' }}>born</th>
            <th style={{ textAlign: 'left' }}>books</th>
          </tr>
          {props.authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token ? (
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <Select
              defaultValue={null}
              options={props.authors.map(a => ({
                value: a.name,
                label: a.name
              }))}
              onChange={setName}
              onSubmit={null}
            />
            <div>
              born
              <input
                type='number'
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}
              />
            </div>
            <button type='submit'>update author</button>
          </form>
        </>
      ) : null}
    </div>
  )
}

export default Authors
