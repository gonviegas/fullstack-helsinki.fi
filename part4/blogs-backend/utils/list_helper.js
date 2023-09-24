const _ = require('lodash')
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

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
  const output = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, blogs: blogs.length }))
    .maxBy('blogs')
  return output
}

const mostLikes = blogs => {
  const output = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, likes: totalLikes(blogs) }))
    .maxBy('likes')
  return output
}

const allBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  allBlogs
}
