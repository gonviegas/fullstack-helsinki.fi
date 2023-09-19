const _ = require('lodash');

const dummy = blogs => {
  if (blogs) return 1
}

const totalLikes = blogs => {
  const blogsLength = Object.keys(blogs).length

  if (blogsLength === 0) return 0
  else if (blogsLength === 1) return blogs[0].likes
  else if (blogsLength > 1)
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  const favoriteBlog = blogs.reduce(
    (res, blog, idx) => (
      !idx || blog.likes > res['likes'] ? (res = blog) : true, res
    ),
    []
  )

  delete favoriteBlog['__v']
  delete favoriteBlog['_id']
  delete favoriteBlog['url']
  return favoriteBlog
}

const mostBlogs = blogs => {
  const output = _(blogs).groupBy('author').map((blogs, author) => ({ author, blogs: blogs.length })).maxBy('blogs')
  console.log(output)
  return output
}

const mostLikes = blogs => {
  const output = _(blogs).groupBy('author').map((blogs, author) => ({ author, likes: totalLikes(blogs) })).maxBy('likes')
  console.log(output)
  return output 
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
