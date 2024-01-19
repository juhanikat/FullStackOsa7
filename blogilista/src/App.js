import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import LoginForm from './components/Login'
import CreateBlogForm from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [createBlogVisible, setCreateBlogVisible] = useState(false)
  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }


  const fetchBlogs = async () => {
    const response = await blogService.getAll()
    setBlogs(response)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
        setNotificationMessage(`User ${user.username} logged in`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    }

    checkLoggedInUser()
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)
      setNotificationMessage(`User ${user.username} logged in`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
      if (window.localStorage.getItem('loggedBlogappUser')) {
        window.localStorage.removeItem('loggedBlogappUser')
        console.log('removed user from local storage')
        setUser(null)
        blogService.setToken(null)
        setNotificationMessage('logged out succesfully')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }
    }
  }

  const createBlog = async (title, author, url) => {
    try {
      await blogService.createBlog({ title, author, url })
      fetchBlogs()
      setNotificationMessage(`Added blog ${title} by ${author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const likeBlog = async (blog) => {
    blog.likes += 1
    try {
      await blogService.updateBlog(blog)
      fetchBlogs()
      setNotificationMessage(`Liked blog ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
      fetchBlogs()
      setNotificationMessage(`Removed blog ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
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
        <Notification message={notificationMessage} />
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
  const blogsList = blogs.map(blog =>
    <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} currentUser={user} />
  ).sort((a, b) => b.props.blog.likes - a.props.blog.likes)
  return (
    <div>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <h2>{user.username} is logged in</h2>
      <button onClick={handleLogOut}>Log out</button>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateBlogVisible(true)}>Create Blog</button>
      </div>
      <div style={showWhenVisible}>
        <CreateBlogForm
          createBlog={createBlog}
        />
        <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
      </div>
      <div className='blogsDiv'>
        <h2>blogs</h2>
        {blogsList}
      </div>
    </div>
  )
}
export default App