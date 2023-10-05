const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  if (username.length < 3) {
    return response
      .status(400)
      .send('username must be at least 3 characters long')
  } else if (password.length < 3) {
    return response
      .status(400)
      .send('password must be at least 3 characters long')
  } else {
    await user
      .save()
      .then(res => {
        response.status(201).json(res)
      })
      .catch(err => {
        if (err.errors.username) response.status(400).send('username already exists')
        else response.status(400)
      })
  }
})

module.exports = usersRouter
