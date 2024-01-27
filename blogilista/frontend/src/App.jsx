import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Route, Routes, Link, useNavigate } from "react-router-dom"
import BlogList from "./components/BlogList"
import CreateBlogForm from "./components/CreateBlog"
import Error from "./components/Error"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import User from "./components/User"
import UserList from "./components/UserList"
import {
  addBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
  addComment
} from "./reducers/blogsReducer"
import { setError } from "./reducers/errorReducer"
import { login, logout } from "./reducers/loginReducer"
import { setNotification } from "./reducers/notificationReducer"
import { initializeUsers } from "./reducers/usersReducer"
import Blog from "./components/Blog"
import NavigationBar from "./components/NavigationBar"

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
  const showWhenVisible = { display: createBlogVisible ? "" : "none" }

  const currentUser = useSelector((state) => state.currentUser)

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
    const username = event.target.username.value
    event.target.username.value = ""
    const password = event.target.password.value
    event.target.password.value = ""
    dispatch(login({ username, password }))
      .then(() => {
        dispatch(setNotification("Logged in succesfully"))
      })
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
        navigate("/")
      })
      .catch((exception) => {
        console.log(exception.response.data.error)
        dispatch(setError(exception.response.data.error))
      })
  }

  const handleAddComment = async (blog, comment) => {
    dispatch(addComment(blog, comment))
      .then(() => {
        dispatch(
          setNotification(`Added comment to ${blog.title} by ${blog.author}`)
        )
      })
      .catch((exception) => {
        console.log(exception.response.data.error)
        dispatch(setError(exception.response.data.error))
      })
  }

  if (currentUser === null) {
    return (
      <div className="container">
        <Notification />
        <Error />
        <div>
          <h2>Log in to application</h2>
          <LoginForm onSubmit={handleLogin} />
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <NavigationBar currentUser={currentUser} />
      <Notification />
      <Error />
      <div>
        <h1>Blog App</h1>
        <button onClick={handleLogOut}>Log out</button>
      </div>
      <Routes>
        <Route path="/blogs" element={<BlogList />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              likeBlog={handleLikeBlog}
              removeBlog={handleRemoveBlog}
              addComment={handleAddComment}
              currentUser={currentUser}
            />
          }
        />
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
              <BlogList />
            </div>
          }
        />
      </Routes>
    </div>
  )
}
export default App
