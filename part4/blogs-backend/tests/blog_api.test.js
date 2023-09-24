const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const initialBlog of helper.initialBlogs) {
    const blog = new Blog(initialBlog)
    await blog.save()
  }
})

describe('getting all blogs', () => {
  test('returns 6 blogs in json', async () => {
    const response = await api.get('/api/blogs')
    // .expect('application/json')
    // .expect(200)
    expect(response.type).toEqual('application/json')
    expect(response.status).toEqual(200)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('id property is defined on each blog', async () => {
    const response = await api.get('/api/blogs')

    for (const blog of response.body) {
      expect(blog.id).toBeDefined()
    }
  })
})

describe('creating a blog', () => {
  test('blog created successfully and return 201', async () => {
    const newBlog = {
      title: 'Test blog creation',
      author: 'John Doe',
      url: 'https://www.test.com',
      likes: 3
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.allBlogs()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs[helper.initialBlogs.length]).toEqual(postResponse.body)
  })

  test('likes not defined on request is set to 0', async () => {
    const newBlog = {
      title: 'Test blog creation',
      author: 'John Doe',
      url: 'https://www.test.com'
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(postResponse.body.likes).toEqual(0)
  })

  test('title not defined on request returns 400', async () => {
    const newBlogWithoutUrl = {
      title: 'Test blog creation',
      author: 'John Doe',
      like: 3
    }

    await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400)
  })

  test('url not defined on request returns 400', async () => {
    const newBlogWithoutTitle = {
      author: 'John Doe',
      url: 'https://www.test.com',
      like: 3
    }

    await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400)
  })
})

describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.allBlogs()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.allBlogs()
    const contents = blogsAtEnd.map(r => r.content)

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(contents).not.toContain(blogToDelete)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.allBlogs()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.allBlogs()
    expect(blogsAtEnd).toContainEqual(blogToUpdate)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
