import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import BlogList from "./components/BlogList"
import CreateBlogForm from "./components/CreateBlog"
import Error from "./components/Error"
import LoginForm from "./components/Login"
import Notification from "./components/Notification"
import User from "./components/User"
import UserList from "./components/UserList"
import {
  addBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog
} from "./reducers/blogsReducer"
import { setError } from "./reducers/errorReducer"
import { login, logout } from "./reducers/loginReducer"
import { setNotification } from "./reducers/notificationReducer"
import { initializeUsers } from "./reducers/usersReducer"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
  const showWhenVisible = { display: createBlogVisible ? "" : "none" }

  const user = useSelector((state) => state.currentUser)

  useEffect(() => {
    const checkLoggedInUser = () => {
      const loggedUserJSON = JSON.parse(
        window.localStorage.getItem("loggedBlogappUser")
      )
      if (loggedUserJSON !== null) {
        dispatch(login(loggedUserJSON))
      }
    }
    const initializeBlogsState = () => {
      dispatch(initializeBlogs())
    }
    const initializeUsersState = () => {
      dispatch(initializeUsers())
    }

    checkLoggedInUser()
    initializeBlogsState()
    initializeUsersState()
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
      .then(() => {})
      .catch((exception) => {
        console.log(exception.response.data.error)
        dispatch(setError(exception.response.data.error))
      })
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    dispatch(logout())
    dispatch(setNotification("logged out succesfully"))
  }

  const handleCreateBlog = (title, author, url) => {
    dispatch(addBlog({ title, author, url }))
      .then(() => {
        dispatch(setNotification(`Added blog ${title} by ${author}`))
      })
      .catch((exception) => {
        console.log(exception.response.data.error)
        dispatch(setError(exception.response.data.error))
      })
  }

  const handleLikeBlog = async (blog) => {
    dispatch(likeBlog(blog))
      .then(() => {
        dispatch(setNotification(`Liked blog ${blog.title} by ${blog.author}`))
      })
      .catch((exception) => {
        console.log(exception.response.data.error)
        dispatch(setError(exception.response.data.error))
      })
  }

  const handleRemoveBlog = async (blog) => {
    dispatch(deleteBlog(blog))
      .then(() => {
        dispatch(
          setNotification(`Removed blog ${blog.title} by ${blog.author}`)
        )
      })

      .catch((exception) => {
        console.log(exception.response.data.error)
        dispatch(setError(exception.response.data.error))
      })
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

  return (
    <div>
      <Notification />
      <Error />
      <div>
        <h2>{user.username} is logged in</h2>
        <button onClick={handleLogOut}>Log out</button>
      </div>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/"
          element={
            <div>
              <div style={hideWhenVisible}>
                <button onClick={() => setCreateBlogVisible(true)}>
                  Create Blog
                </button>
              </div>
              <div style={showWhenVisible}>
                <CreateBlogForm createBlog={handleCreateBlog} />
                <button onClick={() => setCreateBlogVisible(false)}>
                  Cancel
                </button>
              </div>
              <BlogList
                handleLikeBlog={handleLikeBlog}
                handleRemoveBlog={handleRemoveBlog}
                user={user}
              />
            </div>
          }
        />
      </Routes>
    </div>
  )
}
export default App
