import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import React from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const Blog = ({ blog, likeBlog, removeBlog, addComment, currentUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const id = useParams().id
  if (id) {
    const blogs = useSelector((state) => state.blogs)
    const detailedBlog = blogs.find((blog) => blog.id === id)
    if (!detailedBlog) {
      return null
    }

    let displayRemove = false
    if (currentUser && detailedBlog.user.username === currentUser.username) {
      displayRemove = true
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      addComment(detailedBlog, event.target.newComment.value)
    }

    return (
      <div>
        <h2>{detailedBlog.title}</h2>
        {detailedBlog.url}
        {detailedBlog.likes} likes
        <button onClick={() => likeBlog(detailedBlog)}>Like</button>
        <br></br>
        added by {detailedBlog.user.username}
        {displayRemove && (
          <button onClick={() => removeBlog(detailedBlog)}>Remove</button>
        )}
        <h3>comments</h3>
        <ul>
          {detailedBlog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="newComment"></input>
            <button type="submit">Add comment</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="defaultBlog blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </div>
  )
}

export default Blog
