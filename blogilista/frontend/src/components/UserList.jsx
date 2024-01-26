import userService from "../services/userService"
import React from "react"
import { useSelector } from "react-redux"
import User from "./User"

const UserList = () => {
  const users = useSelector((state) => state.users)
  const userList = users.map((user) => <User key={user.id} user={user} />)
  return (
    <div>
      <h1>Users</h1>
      {userList}
    </div>
  )
}

export default UserList
