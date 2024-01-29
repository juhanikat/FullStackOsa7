import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogService"
import { initializeUsers } from "./usersReducer"

const createId = () => {
  return Math.floor(Math.random() * 1000000)
}

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const addBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.createBlog(blog)
    dispatch(createBlog(response.data))
    dispatch(initializeUsers())
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.updateBlog(updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.removeBlog(blog)
    await userService.removeBlogfromUser(blog)
    dispatch(removeBlog(blog))
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat({ id: createId(), text: comment })
    }
    await blogService.updateBlog(updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

const { createBlog, setBlogs, updateBlog, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer
