import React from "react"
import notificationReducer, {
  showNotification
} from "../reducers/notificationReducer"
import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return <div className="success">{notification}</div>
}

export default Notification
