import React from "react"
import notificationReducer, {
  showNotification
} from "../reducers/notificationReducer"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification) {
    return <Alert variant="success">{notification}</Alert>
  } else {
    return null
  }
}

export default Notification
