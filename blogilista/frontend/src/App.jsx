import React from "react"
import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogService"
import loginService from "./services/loginService"
import Notification from "./components/Notification"
import Error from "./components/Error"
import LoginForm from "./components/Login"
import CreateBlogForm from "./components/CreateBlog"
import { setNotification } from "./reducers/notificationReducer"
import { setError } from "./reducers/errorReducer"
import { useDispatch, useSelector } from "react-redux"
import {
  addBlog,
  initializeBlogs,
  likeBlog,
  deleteBlog
} from "./reducers/blogsReducer"
import { login, logout } from "./reducers/userReducer"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
  const showWhenVisible = { display: createBlogVisible ? "" : "none" }

  const user = useSelector((state) => state.user)

  useEffect(() => {
    const checkLoggedInUser = () => {
      const loggedUserJSON = JSON.parse(
        window.localStorage.getItem("loggedBlogappUser")
      )
      if (loggedUserJSON !== null) {
        dispatch(login(loggedUserJSON))
        dispatch(setNotification(`User ${loggedUserJSON.username} logged in`))
      }
    }

    checkLoggedInUser()
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(login({ username, password }))
      //const user = await loginService.login({ username, password })
      //setUser(user)
      //setUsername("")
      //setPassword("")
      //blogService.setToken(user.token)
      //dispatch(setNotification(`User ${user.username} logged in`))
    } catch (exception) {
      console.log(exception)
      if (exception.response !== undefined) {
        dispatch(setError(exception.response.data.error))
      } else {
        dispatch(setError("Unknown error!"))
      }
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    if (user) {
      if (window.localStorage.getItem("loggedBlogappUser")) {
        window.localStorage.removeItem("loggedBlogappUser")
        console.log("removed user from local storage")
        dispatch(logout())
        dispatch(setNotification("logged out succesfully"))
      }
    }
  }

  const createBlog = (title, author, url) => {
    dispatch(addBlog({ title, author, url }))
      .then(() => {
        dispatch(setNotification(`Added blog ${title} by ${author}`))
      })
      .catch((exception) => {
        console.log(exception)
        dispatch(setError(exception.response.data.error))
      })
  }

  const like = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Liked blog ${blog.title} by ${blog.author}`))
    } catch (exception) {
      console.log(exception)
      dispatch(setError(exception.response.data.error))
    }
  }

  const remove = async (blog) => {
    try {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`Removed blog ${blog.title} by ${blog.author}`))
    } catch (exception) {
      console.log(exception)
      dispatch(setError(exception.response.data.error))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <Error />
        <div>
          <h2>Log in to application</h2>
          <LoginForm
            onSubmit={handleLogin}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </div>
      </div>
    )
  }
  const blogsList = blogs
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        likeBlog={like}
        removeBlog={remove}
        currentUser={user}
      />
    ))
    .sort((a, b) => b.props.blog.likes - a.props.blog.likes)
  return (
    <div>
      <Notification />
      <Error />
      <h2>{user.username} is logged in</h2>
      <button onClick={handleLogOut}>Log out</button>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogVisible(true)}>Create Blog</button>
      </div>
      <div style={showWhenVisible}>
        <CreateBlogForm createBlog={createBlog} />
        <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
      </div>
      <div className="blogsDiv">
        <h2>blogs</h2>
        {blogsList}
      </div>
    </div>
  )
}
export default App
