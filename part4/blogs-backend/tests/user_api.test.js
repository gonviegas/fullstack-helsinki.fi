const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('../utils/list_helper')

mongoose.set('bufferTimeoutMS', 30000)

beforeEach(async () => {
  await User.deleteMany({})

  for (const initialUser of helper.initialUsers) {
    const user = new User(initialUser)
    await user.save()
  }
})

describe('getting all users', () => {
  test('returns 3 users in json', async () => {
    const response = await api.get('/api/users')
    expect(response.type).toEqual('application/json')
    expect(response.status).toEqual(200)
    expect(response.body).toHaveLength(helper.initialUsers.length)
  }, 30000)
})

describe('creating a user', () => {
  test('user created successfully and return 201', async () => {
    const newUser = {
      username: 'johndoe4',
      name: 'John Doe 4',
      password: 'pass4'
    }

    const postResponse = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.allUsers()
    expect(users).toHaveLength(helper.initialUsers.length + 1)
    expect(users[helper.initialUsers.length]).toEqual(postResponse.body)
  })

  test('if username already exists returns 400', async () => {
    const newUser = {
      username: 'johndoe3',
      name: 'John Doe 4',
      password: 'pass4'
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response.status).toEqual(400)
    expect(response.text).toEqual('username already exists')

    const users = await helper.allUsers()
    expect(users).toHaveLength(helper.initialUsers.length)
  })

  test('if username is less than 3 characters returns 400', async () => {
    const newUser = {
      username: 'jo',
      name: 'John Doe 4',
      password: 'pass4'
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response.status).toEqual(400)

    const users = await helper.allUsers()
    expect(users).toHaveLength(helper.initialUsers.length)
  })

  test('if password is less than 3 characters returns 400', async () => {
    const newUser = {
      username: 'johndoe4',
      name: 'John Doe 4',
      password: 'pa'
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response.status).toEqual(400)

    const users = await helper.allUsers()
    expect(users).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
