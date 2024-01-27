import React from "react"
import { useSelector } from "react-redux"
import Blog from "./Blog"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogsList = blogs
    .toSorted((a, b) => b.likes - a.likes)
    .map((blog) => (
      <tr key={blog.id}>
        <td>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </td>
        <td>
          <Link to={`/blogs/${blog.id}`}>{blog.author}</Link>
        </td>
      </tr>
    ))

  return (
    <div className="blogsDiv">
      <h2>blogs</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>{blogsList}</tbody>
      </Table>
    </div>
  )
}

export default BlogList
