import React from "react"
import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = ({handleLikeBlog, handleRemoveBlog, user}) => {
  const blogs = useSelector((state) => state.blogs)
  const blogsList = blogs
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        likeBlog={handleLikeBlog}
        removeBlog={handleRemoveBlog}
        currentUser={user}
      />
    ))
    .sort((a, b) => b.props.blog.likes - a.props.blog.likes)
  return (
    <div className="blogsDiv">
      <h2>blogs</h2>
      {blogsList}
    </div>
  )
}

export default BlogList
