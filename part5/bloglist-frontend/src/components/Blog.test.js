import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 'likes',
    user: 'user'
  }

  const user = {}

  const { container } = render(<Blog blog={blog} user={user} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('author')
  const url = screen.queryByText('url')
  const likes = screen.queryByText('likes')
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders url and likes after view button is clicked', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 'likes',
    user: 'user'
  }

  const user = {}

  const { container } = render(<Blog blog={blog} user={user} />)

  const event = userEvent.setup()
  const button = screen.getByText('view')
  await event.click(button)
  const blogDetails = container.querySelector('.blog-details')
  expect(blogDetails).toHaveTextContent('url')
  expect(blogDetails).toHaveTextContent('likes')
})

test('like button is clicked twice and prop event handler is called twice', async () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 'likes',
    user: 'user'
  }

  const user = {}

  const mockHandler = jest.fn()
  render(<Blog blog={blog} user={user} updateBlog={mockHandler} />)

  const event = userEvent.setup()
  const buttonView = screen.getByText('view')
  await event.click(buttonView)
  const button = screen.getByText('like')
  await event.click(button)
  await event.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
