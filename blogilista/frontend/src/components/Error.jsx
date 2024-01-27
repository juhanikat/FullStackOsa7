import React from "react"
import notificationReducer, {
  showNotification
} from "../reducers/notificationReducer"
import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Error = () => {
  const error = useSelector((state) => state.error)

  if (error) {
    return <Alert variant="warning">{error}</Alert>
  } else {
    return null
  }
}

export default Error
