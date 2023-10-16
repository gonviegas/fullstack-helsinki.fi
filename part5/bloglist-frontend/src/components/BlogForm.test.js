import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('prop event handler is called with right details to create a blog', async () => {
  const createBlog = jest.fn()
  const event = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')
  const button = screen.getByText('create')

  await event.type(title, 'this is a title')
  await event.type(author, 'this is the author')
  await event.type(url, 'this is a url')
  await event.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('this is a title')
  expect(createBlog.mock.calls[0][0].author).toBe('this is the author')
  expect(createBlog.mock.calls[0][0].url).toBe('this is a url')
})
