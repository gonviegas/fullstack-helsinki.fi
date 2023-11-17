import { Link } from 'react-router-dom'

const UsersView = ({ users }) => {
  if (users)
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
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>
                  <div>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </div>
                </td>
                <td style={{ paddingLeft: '10px' }}>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}
export default UsersView
