import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogService"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
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
  }
}

export const { createBlog, setBlogs } = blogsSlice.actions
export default blogsSlice.reducer
