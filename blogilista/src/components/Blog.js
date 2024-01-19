import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, likeBlog, removeBlog, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expanded, setExpanded] = useState(false)
  let displayRemove = false
  if (currentUser && blog.user.username === currentUser.username) {
    displayRemove = true
  }

  if (expanded) {
    return (
      <div style={blogStyle} className='expandedBlog blog'>
        {blog.title} {blog.author} <button onClick={() => setExpanded(false)}>Hide</button>
        <br></br>
        {blog.url}
        <br></br>
        Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button>
        <br></br>
        User: {blog.user.username}
        <br></br>
        {displayRemove && <button onClick={() => removeBlog(blog)}>Remove</button>}
      </div>
    )
  }

  return (
    <div className='defaultBlog blog'>
      {blog.title} {blog.author} <button onClick={() => setExpanded(true)}>View</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog