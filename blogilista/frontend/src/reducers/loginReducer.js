import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/loginService"
import blogService from "../services/blogService"
import { setError } from "./errorReducer"

const loginSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    logUserIn(state, action) {
      return action.payload
    },
    logUserOut(state, action) {
      return null
    }
  }
})

export const login = (user) => {
  return async (dispatch) => {
    if (window.localStorage.getItem("loggedBlogappUser")) {
      const loggedInUser = JSON.parse(
        window.localStorage.getItem("loggedBlogappUser")
      )
      blogService.setToken(loggedInUser.token)
      dispatch(logUserIn(loggedInUser))
    } else {
      const username = user.username
      const password = user.password
      const response = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(response))
      blogService.setToken(response.token)
      dispatch(logUserIn(response))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    if (window.localStorage.getItem("loggedBlogappUser")) {
      window.localStorage.removeItem("loggedBlogappUser")
      console.log("removed user from local storage")
    }
    blogService.setToken(null)
    dispatch(logUserOut())
  }
}

const { logUserIn, logUserOut } = loginSlice.actions

export default loginSlice.reducer
