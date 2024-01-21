import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogService"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const newBlog = action.payload
      blogService.createBlog(newBlog)
      state.push(newBlog)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const addBlog = (blog) => {
  return (dispatch) => {
    dispatch(createBlog(blog))
  }
}

export const { showNotification, hideNotification } = blogsSlice.actions
export default blogsSlice.reducer
