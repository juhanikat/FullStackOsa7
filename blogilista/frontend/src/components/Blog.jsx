import { useSelector } from "react-redux"
import React from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

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
      <div className="detailedBlog">
        <h2>
          {detailedBlog.title} by {detailedBlog.author}
        </h2>
        <a href={detailedBlog.url}>{detailedBlog.url}</a>
        <br></br>
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
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="newComment"></input>
            <Button type="submit">Add comment</Button>
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
