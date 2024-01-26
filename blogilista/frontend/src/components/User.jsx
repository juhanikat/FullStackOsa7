import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

const User = ({ user }) => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  if (id) {
    const detailedUser = users.find((user) => user.id === id)
    if (!detailedUser) {
      return null
    }
    const listOfBlogs = detailedUser.blogs.map((blog) => (
      <li key={blog.id}>{blog.title}</li>
    ))

    return (
      <div>
        <h2>{detailedUser.name}</h2>
        <h3>Added Blogs</h3>
        <ul>{listOfBlogs}</ul>
      </div>
    )
  }
  return (
    <div>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
      Blogs Created: {user.blogs.length}
    </div>
  )
}

export default User
