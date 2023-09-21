const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const initialBlog of initialBlogs) {
    const blog = new Blog(initialBlog)
    await blog.save()
  }
})

test('returns 6 blogs in json', async () => {
  const response = await api.get('/api/blogs')

  expect(response.type).toEqual('application/json')
  expect(response.status).toEqual(200)
  expect(response.body).toHaveLength(6)
})

test('id property is defined on each blog', async () => {
  const response = await api.get('/api/blogs')

  for (const blog of response.body) {
    expect(blog.id).toBeDefined()
  }
})

afterAll(async () => {
  await mongoose.connection.close()
})
