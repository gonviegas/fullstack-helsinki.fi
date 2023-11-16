import { Link } from 'react-router-dom'

const UsersView = ({ blogs }) => {
  const usersBlogs = () => {
    const users = []
    for (let i = 0; i < blogs.length; i++) {
      const user = users.find(({ name }) => name === blogs[i].user.username)
      if (user) {
        user.numBlogs++
      } else {
        users.push({
          id: blogs[i].user.id,
          username: blogs[i].user.username,
          name: blogs[i].user.name,
          numBlogs: 1
        })
      }
    }
    return users
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td style={{ paddingLeft: '10px' }}>
              <strong>blogs created</strong>
            </td>
          </tr>
          {usersBlogs().map((user, idx) => (
            <tr key={idx}>
              <td>
                <div>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </div>
              </td>
              <td style={{ paddingLeft: '10px' }}>{user.numBlogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default UsersView
