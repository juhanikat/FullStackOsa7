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
import { useDispatch, useSelector } from "react-redux"
import { addBlog, initializeBlogs } from "./reducers/blogsReducer"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const hideWhenVisible = { display: createBlogVisible ? "none" : "" }
  const showWhenVisible = { display: createBlogVisible ? "" : "none" }

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
        dispatch(setNotification(`User ${user.username} logged in`))
      }
    }

    checkLoggedInUser()
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  })

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
      blogService.setToken(user.token)
      dispatch(setNotification(`User ${user.username} logged in`))
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    if (user) {
      if (window.localStorage.getItem("loggedBlogappUser")) {
        window.localStorage.removeItem("loggedBlogappUser")
        console.log("removed user from local storage")
        setUser(null)
        blogService.setToken(null)
        dispatch(setNotification("logged out succesfully"))
      }
    }
  }

  const createBlog = (title, author, url) => {
    dispatch(addBlog({ title, author, url }))
    dispatch(setNotification(`Added blog ${title} by ${author}`))
  }

  const likeBlog = async (blog) => {
    blog.likes += 1
    try {
      await blogService.updateBlog(blog)
      //fetchBlogs()
      dispatch(setNotification(`Liked blog ${blog.title} by ${blog.author}`))
    } catch (exception) {
      console.log(exception)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.removeBlog(blog)
      //fetchBlogs()
      dispatch(setNotification(`Removed blog ${blog.title} by ${blog.author}`))
    } catch (exception) {
      console.log(exception)
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <Error message={errorMessage} />
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
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        currentUser={user}
      />
    ))
    .sort((a, b) => b.props.blog.likes - a.props.blog.likes)
  return (
    <div>
      <Notification />
      <Error message={errorMessage} />
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
