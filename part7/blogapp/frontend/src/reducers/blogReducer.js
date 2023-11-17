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
    },
    appendComment(state, action) {
      const id = action.payload.id
      const comment = action.payload.comment
      const blogToAddComment = state.find(blog => blog.id === id)
      const addedCommentBlog = { ...blogToAddComment, comments: blogToAddComment.comments.concat(comment) }
      return state.map(blog => (blog.id !== id ? blog : addedCommentBlog))
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

export const createComment = ({ id, comment }) => {
  return async dispatch => {
    const res = await blogsService.addComment({ id: id, comment: comment })

    dispatch(appendComment({ id: id, comment: res }))
  }
}

export const { set, append, remove, like, appendComment } = blogSlice.actions
export default blogSlice.reducer
