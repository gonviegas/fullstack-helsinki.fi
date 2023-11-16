import { useParams } from 'react-router-dom'

const UsersView = ({ blogs }) => {
  const id = useParams().id

  const userBlogs = () => {
    const userBlogs = []
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].user.id === id) {
        userBlogs.push(blogs[i])
      }
    }
    return userBlogs
  }

  return (
    <div>
      <h2>{userBlogs()[0].user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs().map((blog, idx) => (
          <li key={idx}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}
export default UsersView
