import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload
    },
    append(state, action) {
      state.push(action.payload)
    },
    remove(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    like(state, action) {
      const id = action.payload
      const blogToUpdate = state.find(blog => blog.id === id)
      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }
      return state.map(blog => (blog.id !== id ? blog : updatedBlog))
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(set(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogsService.create(blog)
    dispatch(append(newBlog))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogsService.remove(id)
    dispatch(remove(id))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogsService.update(blogToUpdate)
    dispatch(like(updatedBlog.id))
  }
}

export const { set, append, remove, like } = blogSlice.actions
export default blogSlice.reducer
