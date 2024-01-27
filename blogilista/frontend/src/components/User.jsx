import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = ({ user }) => {
  const id = useParams().id
  if (id) {
    const users = useSelector((state) => state.users)
    const detailedUser = users.find((user) => user.id === id)
    if (!detailedUser) {
      return null
    }

    const listOfBlogs = detailedUser.blogs.map((blog) => (
      <li key={blog.id}>{blog.title}</li>
    ))

    return (
      <div>
        <h2>{detailedUser.username}</h2>
        <h3>Added Blogs</h3>
        {detailedUser.blogs.length === 0 ? (
          "No blogs yet"
        ) : (
          <ul>{listOfBlogs}</ul>
        )}
      </div>
    )
  }
  return null
}

export default User
