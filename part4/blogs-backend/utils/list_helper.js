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
  // const favoriteBlog = blogs.reduce(
  //   (res, blog, idx) => (
  //     !idx || blog.likes > res[0]['likes']
  //       ? (res = [blog])
  //       : blog.likes === res[0]['likes']
  //       ? res.push(blog)
  //       : true,
  //     res
  //   ),
  //   []
  // )

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
