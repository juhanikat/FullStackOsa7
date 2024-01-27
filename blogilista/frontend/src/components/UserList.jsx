import React from "react"
import { useSelector } from "react-redux"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"

const UserList = () => {
  const users = useSelector((state) => state.users)
  const userList = users.map((user) => (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  ))
  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </Table>
    </div>
  )
}

export default UserList
